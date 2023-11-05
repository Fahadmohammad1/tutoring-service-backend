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
exports.BookmarkService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addToBookmark = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    data.userId = userId;
    const findItem = yield prisma_1.default.bookmark.findFirst({
        where: {
            serviceId: data.serviceId,
        },
    });
    if (findItem) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already added');
    }
    return yield prisma_1.default.bookmark.create({
        data,
    });
});
const getAllBookmark = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.bookmark.findMany({
        where: {
            userId: id,
        },
    });
});
const getSingleBookmark = (id, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const findItem = yield prisma_1.default.bookmark.findFirst({
        where: {
            userId: id,
        },
    });
    if ((findItem === null || findItem === void 0 ? void 0 : findItem.userId) !== id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unauthorized Access');
    }
    return yield prisma_1.default.bookmark.findUnique({
        where: {
            id: itemId,
        },
    });
});
const updateBookmark = (id, quantity, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const findService = yield prisma_1.default.bookmark.findUnique({
        where: {
            id,
        },
    });
    if (!findService) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Service not available');
    }
    if ((findService === null || findService === void 0 ? void 0 : findService.userId) !== id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unauthorized Access');
    }
    return yield prisma_1.default.bookmark.update({
        where: {
            id: itemId,
        },
        data: {
            quantity: quantity,
        },
    });
});
const deleteBookmark = (id, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const findItem = yield prisma_1.default.bookmark.findFirst({
        where: {
            userId: id,
        },
    });
    if ((findItem === null || findItem === void 0 ? void 0 : findItem.userId) !== id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unauthorized Access');
    }
    return yield prisma_1.default.bookmark.delete({
        where: {
            id: itemId,
        },
    });
});
exports.BookmarkService = {
    addToBookmark,
    getAllBookmark,
    getSingleBookmark,
    updateBookmark,
    deleteBookmark,
};
