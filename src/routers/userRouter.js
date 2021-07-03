const express = require('express');
const { user, newUser } = require('../validators/userSchemas');
const { uuid } = require('../validators/commonSchemas');
const {
    getAll,
    getById,
    create,
    update,
    setDeleted,
    getAutoSuggestions
} = require('../controllers/userController');
const validator = require('../validators/validators');

const router = express.Router();

router.route('/')
    .get(getAll)
    .post(validator(newUser, 'body'), create);

router.get('/suggest', getAutoSuggestions);

router.route('/:id')
    .get(validator(uuid, 'params'), getById)
    .put(validator(uuid, 'params'), validator(user, 'body'), update)
    .delete(validator(uuid, 'params'), setDeleted);

module.exports = router;
