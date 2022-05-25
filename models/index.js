const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'postedBy',
  onDelete: 'CASCADE' 
});

Post.belongsTo(User, {
  foreignKey: 'postedBy'
});

Post.hasMany(Comment, {
    foreignKey: 'onPost'
})

Comment.belongsTo(Post, {
    foreignKey: 'onPost'
})

module.exports = { User, Post, Comment };
