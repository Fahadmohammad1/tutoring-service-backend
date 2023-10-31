import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookmarkController } from './bookmark.controller';

const router = express.Router();

router.post(
  '/add',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.TEACHER,
    ENUM_USER_ROLE.GUARDIAN
  ),
  BookmarkController.addToBookmark
);

export const BookmarkRoutes = router;
