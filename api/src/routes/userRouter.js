const { Router } = require('express');
const router = Router();

const {deleteUser} = require('../controllers/User.controller.js');

const {createUser} = require('../controllers/User/CreateUser.js');
const {loginUser} = require('../controllers/User/LoginUser.js')
const {validateCreateUser} = require('../utils/User/validationData.js');

router.post('/auth/register',validateCreateUser,createUser);
router.get('/auth/login', loginUser);
router.delete('/:id',deleteUser);


module.exports = router;