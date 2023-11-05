"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const bookmark_service_1 = require("./bookmark.service");
const addToBookmark = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield bookmark_service_1.BookmarkService.addToBookmark(req.body, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Added to save for later',
        data: result,
    });
}));
const getAllBookmark = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield bookmark_service_1.BookmarkService.getAllBookmark(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved Successfully!',
        data: result,
    });
}));
const getSingleBookmark = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { id } = req.params;
    const result = yield bookmark_service_1.BookmarkService.getSingleBookmark(userId, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved Successfully!',
        data: result,
    });
}));
const updateBookmark = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { id } = req.params;
    const result = yield bookmark_service_1.BookmarkService.updateBookmark(userId, req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Item updated Successfully!',
        data: result,
    });
}));
const deleteBookmark = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { id } = req.params;
    const result = yield bookmark_service_1.BookmarkService.deleteBookmark(userId, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Item deleted Successfully!',
        data: result,
    });
}));
exports.BookmarkController = {
    addToBookmark,
    getAllBookmark,
    getSingleBookmark,
    updateBookmark,
    deleteBookmark,
};
