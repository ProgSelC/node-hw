import express from 'express';
import schemas from '../config/schemas';
import {
    getAll,
    getById,
    create,
    update,
    setDeleted,
    getAutoSuggestions
} from '../controllers/userController';
import { validator } from '../middlewares/validationMiddleware';

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

export default router;
