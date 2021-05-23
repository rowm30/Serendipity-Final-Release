const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper =  require('../config/jwtHelper')


router.post('/signup', ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/profile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;