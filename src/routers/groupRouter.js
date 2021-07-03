const express = require('express');
const validator = require('../validators/validators');
const { group, newGroup, user2group } = require('../validators/groupSchemas');
const { uuid } = require('../validators/commonSchemas');
const { getAll, getById, add, update, remove, addUsersToGroup } = require('../controllers/groupController');

const router = express.Router();

router.post('/add_users', validator(user2group, 'body'), addUsersToGroup);

router
    .route('/')
    .get(getAll)
    .post(validator(newGroup, 'body'), add);

router
    .route('/:id')
    .get(validator(uuid, 'params'), getById)
    .put(validator(uuid, 'params'), validator(group, 'body'), update)
    .delete(validator(uuid, 'params', remove));

module.exports = router;
