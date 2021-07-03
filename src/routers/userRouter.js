const express = require('express');
const { user, newUser } = require('../validators/userSchemas');
const { uuid } = require('../validators/commonSchemas');
const promiseErrorWrapper = require('../middleware/promiseErrorWrapper');
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
    .get(promiseErrorWrapper(getAll))
    .post(validator(newUser, 'body'), promiseErrorWrapper(create));

router.get('/suggest', promiseErrorWrapper(getAutoSuggestions));

router.route('/:id')
    .get(validator(uuid, 'params'), promiseErrorWrapper(getById))
    .put(validator(uuid, 'params'), validator(user, 'body'), promiseErrorWrapper(update))
    .delete(validator(uuid, 'params'), promiseErrorWrapper(setDeleted));

module.exports = router;
