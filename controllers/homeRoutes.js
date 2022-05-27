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

router.get('/post/view/:postid', async (req, res) => {
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
              attributes: ['id', 'body'],
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

router.get('/post/new', withAuth, (req, res) => {
    res.render('newpost', {logged_in: req.session.logged_in});
});

router.get('/post/edit/:postid', withAuth, async (req, res) => {
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

router.get('/comment/new/:postid', withAuth, async (req, res) => {
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

router.get('/comment/edit/:commentid', withAuth, async (req, res) => {
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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        res.render('login', {});
    }
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.status(404).redirect('/');
    } else {
        res.render('signup');
    }
});

router.get('*', (req, res) => {
    res.redirect('/');
    return;
});

module.exports = router;