const mongoose = require('mongoose');
const BlogPost = require('./models/blogPost');
const User = require('./models/user');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/my_db');

  const blogPost = new BlogPost({ title: 'Hello', content: 'World!', comments: [{ content: 'Hello' }] });
  const user = new User({ name: 'Jonas', blogPosts: [blogPost] });

  blogPost.author = user;

  /* const validationResult = user.validateSync();

  const { message } = validationResult.errors.name;

  console.log(message); */

  console.log(user._id);

  await user.save().catch(err => console.log(err));

  await blogPost.save().catch(err => console.log(err));

  //const users = await User.find({}).populate('blogPosts');
  const users = await User.find({}).populate({
    path: 'blogPosts',
    populate: {
      path: 'author'
    }
  });

  console.log(users[0].blogPosts[0].author.name);

  //const { name } = await User.findByIdAndUpdate(user._id, { name: 'Jonas Pohren' }, { new: true });
  const { name } = await User.findOneAndUpdate({ _id: user._id }, { name: 'Jonas Pohren' }, { new: true });

  console.log(name);

  //const blogPosts = await BlogPost.find({ $text: { $search: 'Hello' } }) //db.blogposts.createIndex({ title: 'text' })
  const blogPosts = await BlogPost.find({ title: { $regex: /el/i } }, { content: 0 }).sort({ title: 'desc' });

  console.log(blogPosts);

  await User.deleteOne({ _id: user._id });

  await User.collection.drop();
  await BlogPost.collection.drop();

  await mongoose.disconnect();
})();