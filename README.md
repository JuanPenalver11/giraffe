# Giraffe 

 Giraffe is a social website that empowers user with the ability to create, edit, comment on, and delete posts, as well as manage their own profiles.

 ## Features 

 Here some of the features Giraffe offers 

 * JWT authorization - (jwt)
 * Route protection 
 * User Profile CRUD - (mongoose model)
 * Post CRUD - (mongoose model)
 * Internal message
 * Post filter 
 * Toast notifications - (snackbar)
 * Like/Dislike option
 * Loading Spinner 
 * Responsive design - (Boostrap)
 * Password recovery through email - (Nodemailer)

 ## Technologies 

 MERN Stack (Mongo Db, Express, React, Node.js)

 CLOUDINARY API for storage purpose

 ##Getting started 

 Install Dependencies 

 ```
 $npm install 
 ```

 On the backend make sure to replace all process.env with your own personal info. 

* tokenAndCookie folder requires you to replace the process.env with your own secret. 

* index.js accomodates cloudinary's config. In order you to be able to use cloudinary 
make sure to have an account, if not create one. Replace process.env with your own API key 
and secret. 

* index.js change PORT as required

* index.js change CORS to your frontend localhost

* utils/dbConnection.js replace proccess.env with your onw Mongo URI. 

Once all dependencies installed and all process.env changed 

to start backend

```

$npm run dev 
```

to start frontend

```

$npm run start
```






