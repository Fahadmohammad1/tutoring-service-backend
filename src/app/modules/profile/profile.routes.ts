import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.TEACHER
  ),
  ProfileController.getSingleProfile
);

router.post(
  '/create-studentProfile/:id',
  validateRequest(ProfileValidation.createStudentProfile),
  ProfileController.createStudentProfile
);

router.post(
  '/create-teacherProfile/:id',
  validateRequest(ProfileValidation.createTeacherProfile),
  ProfileController.createTeacherProfile
);

router.patch(
  '/update-profile',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.PARENT),
  validateRequest(ProfileValidation.updateProfile),
  ProfileController.updateProfile
);

export const ProfileRoutes = router;
