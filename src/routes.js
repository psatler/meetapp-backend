import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizerController from './app/controllers/OrganizerController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// setting the middleware as global, so all the following routes will use this middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:meetupId', MeetupController.update);
routes.delete('/meetups/:meetupId', MeetupController.delete);

routes.get('/organizer', OrganizerController.index);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/meetup/:meetupId/subscription', SubscriptionController.store);

// upload for upload of files
// single for uploading one file at a time and the fieldname used in the request
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
