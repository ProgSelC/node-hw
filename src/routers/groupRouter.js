const express = require('express');
const validator = require('../validators/validators');
const { group, newGroup, user2group } = require('../validators/groupSchemas');
const { uuid } = require('../validators/commonSchemas');
const { getAll, getById, add, update, remove, addUsersToGroup } = require('../controllers/groupController');
const promiseErrorWrapper = require('../middleware/promiseErrorWrapper');

const router = express.Router();

router.post('/add_users', validator(user2group, 'body'), promiseErrorWrapper(addUsersToGroup));

router
    .route('/')
    .get(promiseErrorWrapper(getAll))
    .post(validator(newGroup, 'body'), promiseErrorWrapper(add));

router
    .route('/:id')
    .get(validator(uuid, 'params'), promiseErrorWrapper(getById))
    .put(validator(uuid, 'params'), validator(group, 'body'), promiseErrorWrapper(update))
    .delete(validator(uuid, 'params', promiseErrorWrapper(remove)));

module.exports = router;
