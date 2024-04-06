import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://juanpenalversanchez11:N8dy62IYvLSPhDY5@cluster0.981n1wd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(console.log("DB connected"))
    .catch((err) => console.log(err));
};
