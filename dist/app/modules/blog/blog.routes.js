"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.get('/:id', blog_controller_1.BlogController.getsingleBlog);
router.get('/', blog_controller_1.BlogController.getAllBlog);
router.post('/create-blog', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.createBlog);
router.patch('/update-blog', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.updateBlog);
router.delete('/delete-blog', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
