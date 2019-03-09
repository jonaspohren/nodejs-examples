const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.pre('remove', async function() {
  const BlogPost = mongoose.model('blogPost');

  await BlogPost.deleteMany({ _id: { $in: this.blogPosts } });
});

UserSchema.virtual('posts').get(function() {
  return this.blogPosts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;