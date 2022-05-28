const router = require("express").Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const createData = req.body;
        createData.postedBy = req.session.user_id;
        createData.date = new Date();

        console.log(createData);

        const newPostData = await Post.create(createData);
        const newPost = newPostData.get({ plain: true});

        console.log('\n\n');
        console.log(newPost);
        console.log('\n\n');
        
        res.json({ user: newPost, message: 'Posted successfully!' });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === 'email') {
            res.status(400).send({message: "A user with this email already exists."});
        } else {
            res.status(500).send(error);
        }
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
        if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === 'email') {
            res.status(400).send({message: "A user with this email already exists."});
        } else {
            res.status(500).send(error);
        }
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
        if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === 'email') {
            res.status(400).send({message: "A user with this email already exists."});
        } else {
            res.status(500).send(error);
        }
    }
});

module.exports = router;