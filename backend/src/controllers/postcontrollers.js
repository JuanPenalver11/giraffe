import Post from "../models/postModel.js";
import User from "../models/userModel.js";
//////////////////////////////////////////////////////////////////////////////

export const getPosts = async (req, res) => {
  //obtain category from query
  const { postcategory } = req.query;

  try {
    //check if category is defined
    let posts;
    if (postcategory === undefined || postcategory === "") {
      posts = await Post.find({}).sort({ createdAt: -1 });
    } else {
      posts = await Post.find({ postcategory }).sort({ createdAt: -1 });
    }
    if (posts.length < 1) {
      res.status(404).json({ error: "There is no posts available" });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const getPostById = async (req, res) => {
  const { idpost } = req.params;
  try {
    //does post exist?
    const post = await Post.findById(idpost);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const createPost = async (req, res) => {
  //obtain info from body
  const { postcategory, posttitle, postbody, postimg } = req.body;
  try {
    //check user auth
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    //check length postitle
    if (posttitle.length > 40) {
      return res
        .status(400)
        .json({ error: "Post title cannot be longer than 40 characters" });
    }
    if (!postcategory) {
      return res.status(400).json({ error: "A category must be selected" });
    }
    //create post
    const newPost = await Post.create({
      postedBy: user._id,
      postcategory,
      posttitle,
      postbody,
      postimg,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const modifyPost = async (req, res) => {
  //fetch info from body
  const { postcategory, posttitle, postbody, postimg } = req.body;
  //fetch post id from params
  const { idpost } = req.params;
  try {
    //check if post exist
    const post = await Post.findById(idpost);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //check if user exist
    const user = await User.findById(post.postedBy);
    if (!user) return res.status(404).json({ error: "User not found" });
    //check user auth
    if (user._id.toString() !== req.user._id.toString())
      return res.status(400).json({ error: "Unauthorized" });
    //check title legth
    if (posttitle && posttitle > 20) {
      return res
        .status(400)
        .json({ error: "Post title cannot be longer than 20 characters" });
    }
    //update post
    const updatedPost = await Post.findByIdAndUpdate(
      idpost,
      { postcategory, posttitle, postbody, postimg },
      { new: true }
    );

    if (!updatedPost) {
      return res.send(404).json({ error: "Post nof found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const deletePost = async (req, res) => {
  //fetch post id from params
  const { idpost } = req.params;
  try {
    //find id
    const post = await Post.findById(idpost);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //find user
    const user = await User.findById(post.postedBy);
    //check user auth
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    //delete
    await Post.findByIdAndDelete(idpost);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const likePost = async (req, res) => {
  //fetch post id
  const { idpost } = req.params;
  try {
    //does post exist?
    const post = await Post.findById(idpost);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //check if user already liked this post == includes return boolean
    const userLikedPost = post.postlikes.includes(req.user._id);
    //create toggle to like and unlike
    if (userLikedPost) {
      await Post.updateOne(
        { _id: idpost },
        { $pull: { postlikes: req.user._id } }
      );
      const updatedPost = await Post.findById(idpost);
      res.status(200).json({ message: "Unliked", data: updatedPost.postlikes });
    } else {
      await Post.updateOne(
        { _id: idpost },
        { $push: { postlikes: req.user._id } }
      );
      const updatedPost = await Post.findById(idpost);
      res.status(200).json({ message: "Liked", data: updatedPost.postlikes });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const commentPost = async (req, res) => {
  //fetch post id from params
  const { idpost } = req.params;
  //fetch information from body
  const observation = req.body.comment;
  try {
    //comment cannot be empty
    if (!observation) {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }
    //check if post exist
    const post = await Post.findById(idpost);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //create comment
    const comment = {
      userId: req.user._id,
      comment: observation,
      userProfilePic: req.user.profilePic,
      username: req.user.username,
    };
    //insert new comment into postComment array
    post.postcomments.push(comment);
    //save
    await post.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const modifyComment = async (req, res) => {
  try {
    const postId = req.params.idpost;
    const commentId = req.params.idcomment;
    const newComment = req.body.newComment;

    // check post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    //find comment and check existence == comment is an object inside an array inside a key
    //find doesn't work nor = hence findIndex and use equals method
    const commentIndex = post.postcomments.findIndex((comment) => {
      return comment._id.equals(commentId);
    });

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    //verify user auth
    if (
      post.postcomments[commentIndex].userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    //Modifuy comment and save
    post.postcomments[commentIndex].comment = newComment;
    await post.save();

    res.json({
      message: "Comment updated successfully",
      updatedComment: post.postcomments[commentIndex],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
//////////////////////////////////////////////////////////////////////////////

export const deleteComment = async (req, res) => {
  //id comment from params
  const { idcomment } = req.params;
  //id post from params
  const { idpost } = req.params;

  try {
    //does post exist?
    const post = await Post.findById(idpost);
    if (!post) return res.status(404).json({ error: "Post not found" });

    //does comment exist?
    const commentIndex = post.postcomments.findIndex((comment) => {
      return comment._id.equals(idcomment);
    });
    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment nof found" });
    }

    //is user auth?
    if (
      post.postcomments[commentIndex].userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    //delete comment and save post;
    post.postcomments.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
