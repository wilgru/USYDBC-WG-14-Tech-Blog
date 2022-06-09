const router = require('express').Router();
const { User } = require('../../models')

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res.status(400).send({message: 'Incorrect email or password. Please try again'});
            return;
        }

        const passwordIsValid = userData.checkPassword(req.body.password);

        if (!passwordIsValid) {
            res.status(400).send({message: 'Incorrect email or password. Please try again'});
            return; 
        }

        const user = await userData.get({ plain: true })

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.user_name = user.name;
            req.session.user_email = user.password;
            req.session.logged_in = true; //<-- potential bug
            
            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUserData = await User.create(req.body);
        const newUser = newUserData.get({ plain: true});
        
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.user_name = newUser.name;
            req.session.user_email = newUser.password;
            req.session.logged_in = true; //<-- potential bug
            
            res.json({ user: newUser, message: 'You are now logged in!' });
        });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === 'email') {
            res.status(400).send({message: "A user with this email already exists."});
        } else {
            res.status(500).send(error);
        }
    }
});

router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;