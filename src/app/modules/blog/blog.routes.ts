import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BlogController } from './blog.controller';

const router = express.Router();

router.get('/:id', BlogController.getsingleBlog);
router.get('/', BlogController.getAllBlog);

router.post(
  '/create-blog',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.createBlog
);

router.patch(
  '/update-blog',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.updateBlog
);

router.delete(
  '/delete-blog',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.deleteBlog
);

export const BlogRoutes = router;
