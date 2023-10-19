"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post('/add-review', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.GUARDIAN), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.addReview), review_controller_1.ReviewController.addReview);
router.patch('/update-review/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.GUARDIAN), review_controller_1.ReviewController.updateReview);
router.delete('/delete-review/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.GUARDIAN), review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
