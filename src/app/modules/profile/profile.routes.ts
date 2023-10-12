import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileController } from './profile.controller';
import { ProfileValidation } from './profile.validation';

const router = express.Router();

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

export const ProfileRoutes = router;
