import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { BookmarkRoutes } from '../modules/bookmark/bookmark.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/profile',
    routes: ProfileRoutes,
  },
  {
    path: '/service',
    routes: ServiceRoutes,
  },
  {
    path: '/booking',
    routes: BookingRoutes,
  },
  {
    path: '/review',
    routes: ReviewRoutes,
  },
  {
    path: '/bookmark',
    routes: BookmarkRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
