const { Router } = require("express");
const { User } = require('../../models')

Router.post('/login', async (req, res) => {
    const userData = await User.findOne({
        where: {
            email: req.bod.email
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

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.user_name = userData.name;
        req.session.user_email = userData.password;
        req.session.loggedIn = true; //<-- potential bug
        
        res.json({ user: userData, message: 'You are now logged in!' });
    });
});