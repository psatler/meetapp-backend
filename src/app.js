import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  // setting up the methods of the class
  middleware() {
    // The request handler must be the first middleware on the app - This is a sentry middleware
    this.server.use(Sentry.Handlers.requestHandler());
    // adding cors to filter which URLs can access our API
    this.server.use(cors());
    // making it possible to handle json requests
    this.server.use(express.json());
    // for static files
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // we could`ve done like below, but we'll import the routes from another file
    // this.server.get('/', )
    this.server.use(routes);

    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // registering a middleware for errors in express (4 arguments)
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
