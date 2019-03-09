const mongoose = require('mongoose');
const CommentSchema = require('./comment.js');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [CommentSchema]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;