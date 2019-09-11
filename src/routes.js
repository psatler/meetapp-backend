import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// setting the middleware as global, so all the following routes will use this middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
