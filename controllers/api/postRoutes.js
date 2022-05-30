const router = require("express").Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const createData = req.body;
        createData.postedBy = req.session.user_id;
        createData.date = new Date();

        const newPostData = await Post.create(createData);
        const newPost = newPostData.get({ plain: true});
        
        res.json({ user: newPost, message: 'Posted successfully!' });

    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:postid', async (req, res) => {
    try {
        const PostData = await Post.findOne({
            where: {
                id: req.params.postid
            }
        });

        const posti = PostData.get({ plain: true});

        if (posti.postedBy != req.session.user_id) {
            res.status(403).redirect('/');
            return;
        }

        PostData.set({
            title: req.body.title,
            body: req.body.body
          });

        await PostData.save();
        
        res.json({ message: 'Post edited successfully!' });

    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:postid', async (req, res) => {
    try {
        const PostData = await Post.findOne({
            where: {
                id: req.params.postid
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
        res.status(500).send(error);
    }
});

module.exports = router;