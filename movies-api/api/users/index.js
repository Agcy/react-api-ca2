import express from 'express';
import User from './userModel';
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        // TODO: 更改判断逻辑保证登录和注册情况不冲突
        // if (!req.body.account || !req.body.password) {
        //     console.info(req.body.account)
        //     console.info(req.body.password)
        //     return res.status(400).json({success: false, msg: 'Username and password are required.'});
        // }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.info(req.body.account)
            console.info(req.body.password)
            return res.status(400).json({success: false, msg: 'something got wrong'});
        }
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({success: false, msg: 'Internal server error.'});
    }
}));


// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({code: 200, msg: 'User Updated Sucessfully'});
    } else {
        res.status(404).json({code: 404, msg: 'Unable to Update User'});
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({success: true, msg: 'User successfully created.'});
}

async function authenticateUser(req, res) {
    let user;
    const {account, password} = req.body;

    console.info(account)
    console.info(password)

    // 判断输入的是邮箱还是用户名
    if (account.includes('@')) {
        user = await User.findByEmail(account);
    } else {
        user = await User.findByUserName(account);
    }

    if (!user) {
        return res.status(401).json({success: false, msg: 'Authentication failed. User not found.'});
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
        const token = jwt.sign({username: user.username}, process.env.SECRET);
        res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
            user: {
                "username": user.username,
                "email": user.email
            }
        });
    } else {
        res.status(401).json({success: false, msg: 'Wrong password.'});
    }
}

export default router;
