const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment } = require('../models')

router.get('/new/:postid', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.postid
        }
    });

    if (!postData) {
        res.redirect('/');
        return;
    }

    res.render('newcomment', {logged_in: req.session.logged_in});
});

router.get('/edit/:commentid', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.findOne({
            where: {
                id: req.params.commentid
            }
        });

        if (!commentData) {
            res.redirect('/');
            return;
        }

        const comment = commentData.get({ plain: true });

        if (comment.commentedBy != req.session.user_id) {
            res.status(402).redirect('/');
            return;
        }

        res.render('editcomment', { comment, logged_in: req.session.logged_in });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;