import Sequelize from 'sequelize';

// importing the models
import User from '../app/models/User';

import databaseConfig from '../config/database';

// storing the models in an array to initiliaze the connection for each of them
const models = [User];

class Database {
  constructor() {
    // calling the method init
    this.init();
  }

  init() {
    // instantiating a new variable
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
