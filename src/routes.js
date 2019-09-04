import { Router } from 'express';

// for testing purposes
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Pablo Satler',
    email: 'pablo@teste.com',
    password_hash: '123456',
  });

  return res.json(user);
});

export default routes;
