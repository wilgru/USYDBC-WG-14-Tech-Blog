const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment, User } = require('../models')

router.get('/view/:postid', async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.postid
        },
        include: [
            {
              model: User,
              attributes: ['id', 'name']
            },
            {
              model: Comment,
              attributes: ['id', 'body', 'date'],
              include: [
                  {
                      model: User,
                      attributes: ['id', 'name']
                  }
              ]
            }
        ]
    });

    if (!postData) {
        res.redirect('/');
        return;
    }

    const post = postData.get({ plain: true });
    post.isThisUser = (post.postedBy === req.session.user_id);

    post.comments.forEach(comment => {
        comment.commentedByThisUser = (comment.user.id === req.session.user_id)
        return comment
    });

    console.log(post.comments);

    res.render('post', { post, logged_in: req.session.logged_in });
});

router.get('/new', withAuth, (req, res) => {
    res.render('newpost', {logged_in: req.session.logged_in});
});

router.get('/edit/:postid', withAuth, async (req, res) => {
    try{
        const postData = await Post.findOne({
            where: {
                id: req.params.postid
            }
        });

        if (!postData) {
            res.redirect('/');
            return;
        }

        const post = postData.get({ plain: true });

        if (post.postedBy != req.session.user_id) {
            res.redirect('/');
            return;
        }

        res.render('editpost', { post, logged_in: req.session.logged_in });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router