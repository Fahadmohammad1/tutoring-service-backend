import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/all-profiles',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllProfiles
);

export const UserRoutes = router;
