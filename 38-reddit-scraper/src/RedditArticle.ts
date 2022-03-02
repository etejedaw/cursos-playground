import mongoose from "mongoose";

const RedditArticle = new mongoose.Schema({
    title: String
});

export default mongoose.model("RedditArticle", RedditArticle);