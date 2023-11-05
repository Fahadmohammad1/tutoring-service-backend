"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const booking_routes_1 = require("../modules/booking/booking.routes");
const bookmark_routes_1 = require("../modules/bookmark/bookmark.routes");
const profile_routes_1 = require("../modules/profile/profile.routes");
const review_routes_1 = require("../modules/review/review.routes");
const service_routes_1 = require("../modules/service/service.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.UserRoutes,
    },
    {
        path: '/profile',
        routes: profile_routes_1.ProfileRoutes,
    },
    {
        path: '/service',
        routes: service_routes_1.ServiceRoutes,
    },
    {
        path: '/booking',
        routes: booking_routes_1.BookingRoutes,
    },
    {
        path: '/review',
        routes: review_routes_1.ReviewRoutes,
    },
    {
        path: '/bookmark',
        routes: bookmark_routes_1.BookmarkRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
