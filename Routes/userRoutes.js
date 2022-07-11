const express = require('express');

const {
    registerUser,
    loginUser,
    getUser
} = require('../Controllers/userControllers');
const {
    protect
} = require('../Middlewares/authMiddleware');

const router = express.Router();
const corsOptions = {
    origin: ['https://accomplished.netlify.app/', 'https://accomplished.netlify.app/login', 'https://accomplished.netlify.app/register', 'https://accomplished.netlify.app/dashboard']
};

router.post('/', cors(corsOptions), registerUser);

router.post('/login', cors(corsOptions), loginUser);

router.get('/me', cors(corsOptions), protect, getUser);



module.exports = router;