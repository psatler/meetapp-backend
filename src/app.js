import express from 'express';
import { resolve } from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  // setting up the methods of the class
  middleware() {
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
  }
}

export default new App().server;
