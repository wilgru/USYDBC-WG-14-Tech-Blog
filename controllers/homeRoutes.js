const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models')

router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
    
        // Serialize data so the template can read it
        const posts = postsData.map((post) => post.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('homepage', { posts, loggedin: req.session.loggedin })
    } catch(error) {
        res.status(500).send(error);
    }
});

router.get('/dashboard', withAuth, (req, res) => {
    res.render('dashboard', {});
});

router.get('/post/:postid', async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.postid
        },
        include: {
            model: Comment
        }
    });

    const post = postData.get({ plain: true });

    res.render('post', { post });
});

router.get('post/:postid/newcomment/:postid', withAuth, (req, res) => {

});

router.get('post/:postid/editcomment/:postid', withAuth, (req, res) => {

});

router.post('/newpost', withAuth, (req, res) => {

});

router.get('/editpost/:postid', withAuth, (req, res) => {

});

router.get('/login', (req, res) => {
    if (req.session.loggedin) {
        res.redirect('/');
    } else {
        res.render('login', {});
    }
});

router.get('/signup', (req, res) => {

});

router.get('*', (req, res) => {
    res.render('homepage');
});

module.exports = router;