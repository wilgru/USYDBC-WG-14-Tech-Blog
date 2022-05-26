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
                    attributes: ['id', 'name'],
                },
            ],
        });
    
        // Serialize data so the template can read it
        const postsi = postsData.map((post) => post.get({ plain: true }));
        const posts = postsi.map((post) => {
            post.isThisUser = (post.postedBy === req.session.user_id);
            return post;
        });
    
        // Pass serialized data and session flag into template
        res.render('homepage', { posts, logged_in: req.session.logged_in })
    } catch(error) {
        res.status(500).send(error);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postsData = await Post.findAll({
            where: {
                postedBy: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
    
        // Serialize data so the template can read it
        const postsi = postsData.map((post) => post.get({ plain: true }));
        const posts = postsi.map((post) => {
            post.isThisUser = (post.postedBy === req.session.user_id);
            return post;
        });
    
        // Pass serialized data and session flag into template
        res.render('dashboard', { posts, logged_in: req.session.logged_in })
    } catch(error) {
        res.status(500).send(error);
    };
});

router.get('/post/:postid', async (req, res) => {
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
              attributes: ['body'],
              include: [
                  {
                      model: User,
                      attributes: ['name']
                  }
              ]
            }
        ]
    });

    const post = postData.get({ plain: true });
    post.isThisUser = (post.postedBy === req.session.user_id);

    console.log(post)

    res.render('post', { post, logged_in: req.session.logged_in });
});

router.get('post/:postid/newcomment/:postid', withAuth, (req, res) => {

});

router.get('post/:postid/editcomment/:postid', withAuth, (req, res) => {

});

router.get('/newpost', withAuth, (req, res) => {
    res.render('newpost');
});

router.get('/post/edit/:postid', withAuth, (req, res) => {

});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.render('homepage');
    } else {
        res.render('login', {});
    }
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.status(404).render('homepage');
    } else {
        res.render('signup');
    }
});

router.get('*', (req, res) => {
    res.render('homepage');
});

module.exports = router;