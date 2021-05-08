const express = require('express');
const { statusCodes } = require('http-status-codes');
const schemas = require('../validators/userSchema');
const {
    getAll,
    getById,
    create,
    update,
    setDeleted,
    getAutoSuggestions
} = require('../controllers/userController');
const validator = require('../validators/validationMiddleware');

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(getAll)
    .post(validator(schemas.userPost), create);

router.get('/suggest', getAutoSuggestions);

router.route('/:id')
    .get(getById)
    .put(validator(schemas.userPost), update)
    .delete(setDeleted);

module.exports = router;
