const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            email:req.body.email,
            fullname:req.body.fullname,
            phone:req.body.phone,
            mobilephone:req.body.mobilephone,
            address1:req.body.address1,
            address2:req.body.address2,
            address3:req.body.address3,
            password: hash,
            image: req.body.image
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, 'AnythingCanBeMySecretKey');
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, 'AnythingCanBeMySecretKey');
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})


router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id, image: req.user.image });
});

router.get('/',(req, res, next) => {
    User.find({},(err,users)=>{
        if(err){
            res.json(next)
        }
        res.json(users)
    });
})
;

module.exports = router;
