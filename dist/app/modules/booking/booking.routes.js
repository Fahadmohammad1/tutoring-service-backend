"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.TEACHER, user_1.ENUM_USER_ROLE.SUPER_ADMIN));
router.get('/all-bookings', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.BookingController.getAllBookings);
router.post('/create-booking', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), booking_controller_1.BookingController.createBooking);
router.patch('/update-timeSlot/:bookingId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TEACHER, user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.BookingController.updateBookingTimeSlot);
router.patch('/update-booking/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.TEACHER, user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.BookingController.updateBooking);
router.delete('/delete-booking/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.BookingController.cancelBooking);
exports.BookingRoutes = router;
