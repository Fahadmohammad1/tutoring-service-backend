import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.get('/:id', ServiceController.getSingleService);
router.get('/', ServiceController.getAllServices);

router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.TEACHER),
  validateRequest(ServiceValidation.createService),
  ServiceController.createService
);
router.patch(
  '/update-service/:id',
  auth(ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.updateSerive),
  ServiceController.updateService
);
router.delete(
  '/delete-service/:id',
  auth(ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteService
);

export const ServiceRoutes = router;
