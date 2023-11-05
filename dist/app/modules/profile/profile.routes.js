"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const profile_controller_1 = require("./profile.controller");
const profile_validation_1 = require("./profile.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER), profile_controller_1.ProfileController.getSingleProfile);
router.post('/create-studentProfile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(profile_validation_1.ProfileValidation.createStudentProfile), profile_controller_1.ProfileController.createProfile);
router.post('/create-teacherProfile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(profile_validation_1.ProfileValidation.createTeacherProfile), profile_controller_1.ProfileController.createProfile);
router.patch('/update-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER), (0, validateRequest_1.default)(profile_validation_1.ProfileValidation.updateProfile), profile_controller_1.ProfileController.updateProfile);
exports.ProfileRoutes = router;
