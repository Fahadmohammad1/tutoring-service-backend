## Technology Used

### Backend

- Typescript
- Node JS
- Express JS
- Es Lint and Husky
- Cors
- Prisma (ORM)
- JWT
- ZOD
- Bcrypt

### Frontend

- Typescript
- Next JS
- React JS
- React Redux and Redux toolkit
- Axios
- React hook form
- Tailwind (CSS library)
- Material UI (Component library)

### Database

- PostgreSQL

### API Endpoints

**Auth**

- /auth/signup (post)
- /auth/signin (post)
- /auth/reset-token (post)

**User**

- /users/all-profiles

**Profile**

- /profile (get)
- /profile/create-studentProfile (post)
- /profile/create-teacherProfile (post)
- /profile/update-profile (patch)

**Service**

- /service/:id (get)
- /service (all) (get)
- /service/create-service (post)
- /service/update-service/:id (patch)
- /service/delete-service/:id (delete)

**Bookmark**

- /bookmark/add

**Booking**

- /booking (get)
- /booking/all-bookings (get)
- /booking/create-booking (post)
- /booking/update-timeSlot/:bookingId (patch)
- /booking/update-booking/:id (patch)
- /booking/delete-booking/:id (delete)

**Reviews**

- /review/add-review (post)
- /review/update-review (patch)
- /review/delete-review/:id (delete)

**Blog**

- /blog/:id (get)
- /blog (all)
- /blog/create-blog (post)
- /blog/update-blog (update)
- /blog/delete-blog (delete)

[Postman API](https://documenter.getpostman.com/view/29775835/2s9YRB1X3j)
