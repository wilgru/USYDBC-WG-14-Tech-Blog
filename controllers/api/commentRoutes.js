const router = require("express").Router();
const { Comment } = require('../../models');

router.post('/:postid', async (req, res) => {
    try {
        const createData = req.body;
        createData.onPost = parseInt(req.params.postid);
        createData.commentedBy = req.session.user_id;

        console.log(createData);

        const newCommentData = await Comment.create(createData);
        const newComment = newCommentData.get({ plain: true});
        
        res.json({ user: newComment, message: 'Commented successfully!' });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === 'email') {
            res.status(400).send({message: "A user with this email already exists."});
        } else {
            res.status(500).send(error);
        }
    }
});

router.put('/:commentid', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.commentid
            }
        });

        const commenti = commentData.get({ plain: true});

        if (commenti.commentedBy != req.session.user_id) {
            res.status(403).redirect('/');
            return;
        }

        commentData.set({
            body: req.body.body
          });

        await commentData.save();
        
        res.json({ message: 'Comment edited successfully!' });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === 'email') {
            res.status(400).send({message: "A user with this email already exists."});
        } else {
            res.status(500).send(error);
        }
    }
});

router.delete('/:commentid', async (req, res) => {
    try {
        const PostData = await Post.findOne({
            where: {
                id: req.params.commentid
            }
        });

        const posti = PostData.get({ plain: true});

        if (posti.postedBy != req.session.user_id) {
            res.status(403).redirect('/');
            return;
        }

        await PostData.destroy();
        
        res.json({ message: 'Post deleted successfully!' });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === 'email') {
            res.status(400).send({message: "A user with this email already exists."});
        } else {
            res.status(500).send(error);
        }
    }
});

module.exports = router;