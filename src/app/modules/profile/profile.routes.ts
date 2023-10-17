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
  '/create-studentProfile',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ProfileValidation.createStudentProfile),
  ProfileController.createProfile
);

router.post(
  '/create-guardianProfile',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ProfileValidation.createGuardianProfile),
  ProfileController.createProfile
);

router.post(
  '/create-teacherProfile',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ProfileValidation.createTeacherProfile),
  ProfileController.createProfile
);

router.patch(
  '/update-profile',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.GUARDIAN),
  validateRequest(ProfileValidation.updateProfile),
  ProfileController.updateProfile
);

export const ProfileRoutes = router;
