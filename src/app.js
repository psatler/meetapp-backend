import express from 'express';
import routes from './routes';

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
  }

  routes() {
    // we could`ve done like below, but we'll import the routes from another file
    // this.server.get('/', )
    this.server.use(routes);
  }
}

export default new App().server;
