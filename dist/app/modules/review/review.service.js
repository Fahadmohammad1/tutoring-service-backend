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
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addReview = (userId, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const findReview = yield prisma_1.default.reviews.findFirst({
        where: {
            userId: userId,
        },
    });
    if ((findReview === null || findReview === void 0 ? void 0 : findReview.userId) === userId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Review already added');
    }
    return yield prisma_1.default.reviews.create({
        data: reviewData,
    });
});
const getAllReviews = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.reviews.findMany({
        where: {
            serviceId: serviceId,
        },
    });
});
const updateReview = (reviewId, userId, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const findReview = yield prisma_1.default.reviews.findFirst({
        where: {
            id: reviewId,
        },
    });
    if ((findReview === null || findReview === void 0 ? void 0 : findReview.userId) !== userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
    }
    return yield prisma_1.default.reviews.update({
        where: {
            id: reviewId,
        },
        data: reviewData,
    });
});
const deleteReview = (reviewId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findReview = yield prisma_1.default.reviews.findUnique({
        where: {
            id: reviewId,
        },
    });
    if ((findReview === null || findReview === void 0 ? void 0 : findReview.userId) !== userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
    }
    return yield prisma_1.default.reviews.delete({
        where: {
            id: reviewId,
        },
    });
});
exports.ReviewService = {
    addReview,
    getAllReviews,
    updateReview,
    deleteReview,
};
