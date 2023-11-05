"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const bookmark_controller_1 = require("./bookmark.controller");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER), bookmark_controller_1.BookmarkController.getSingleBookmark);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER), bookmark_controller_1.BookmarkController.getAllBookmark);
router.post('/add', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER), bookmark_controller_1.BookmarkController.addToBookmark);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER), bookmark_controller_1.BookmarkController.updateBookmark);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER), bookmark_controller_1.BookmarkController.deleteBookmark);
exports.BookmarkRoutes = router;
