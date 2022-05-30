const router = require("express").Router();
const { Comment } = require('../../models');

router.post('/:postid', async (req, res) => {
    try {
        const createData = req.body;
        createData.onPost = parseInt(req.params.postid);
        createData.commentedBy = req.session.user_id;
        createData.date = new Date();

        console.log(createData);

        const newCommentData = await Comment.create(createData);
        const newComment = newCommentData.get({ plain: true});
        
        res.json({ user: newComment, message: 'Commented successfully!' });

    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:commentid', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.commentid
            }
        });

        const comment = commentData.get({ plain: true});

        if (comment.commentedBy != req.session.user_id) {
            res.status(403).redirect('/');
            return;
        }

        commentData.set({
            body: req.body.body
          });

        await commentData.save();
        console.log(comment.onPost);
        
        res.json({ post: comment.onPost, message: 'Comment edited successfully!' });

    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:commentid', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.commentid
            }
        });

        const comment = commentData.get({ plain: true});

        if (comment.commentedBy != req.session.user_id) {
            res.status(403).redirect('/');
            return;
        }

        await commentData.destroy();
        
        res.json({ post: comment.onPost, message: 'Comment deleted successfully!' });

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;