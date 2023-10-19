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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookingData.userId && !bookingData.serviceId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to book service');
    }
    return yield prisma_1.default.booking.create({
        data: bookingData,
        include: {
            user: true,
            service: true,
            timeSlots: true,
        },
    });
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.booking.findMany({});
});
const getMyBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    return yield prisma_1.default.booking.findMany({
        where: {
            userId: userId,
        },
    });
});
const cancelBooking = (user, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const findBooking = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (user.userId !== (findBooking === null || findBooking === void 0 ? void 0 : findBooking.userId)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
    }
    return yield prisma_1.default.booking.delete({
        where: {
            id: bookingId,
        },
    });
});
const updateBookingTimeSlot = (user, bookingId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const findBooking = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
        include: {
            service: true,
            timeSlots: true,
        },
    });
    if (user.role !== 'admin' &&
        user.email !== (findBooking === null || findBooking === void 0 ? void 0 : findBooking.service.authorEmail)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
    }
    return yield prisma_1.default.timeSlots.update({
        where: {
            id: findBooking === null || findBooking === void 0 ? void 0 : findBooking.timeSlots.id,
        },
        data,
    });
});
const updateBooking = (user, bookingId, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const findBooking = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
        include: {
            service: true,
        },
    });
    if (user.role !== 'admin' &&
        user.email !== (findBooking === null || findBooking === void 0 ? void 0 : findBooking.service.authorEmail)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
    }
    return yield prisma_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: bookingData,
    });
});
exports.BookingService = {
    createBooking,
    getAllBookings,
    getMyBookings,
    cancelBooking,
    updateBooking,
    updateBookingTimeSlot,
};
