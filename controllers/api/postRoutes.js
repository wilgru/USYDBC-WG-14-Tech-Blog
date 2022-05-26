const router = require("express").Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const createData = req.body;
        createData.postedBy = req.session.user_id;

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

module.exports = router;