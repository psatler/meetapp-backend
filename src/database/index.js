import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// importing the models
import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscription from '../app/models/Subscription';

import databaseConfig from '../config/database';

// storing the models in an array to initiliaze the connection for each of them
const models = [User, File, Meetup, Subscription];

class Database {
  constructor() {
    // calling the method init
    this.init();
    // initilizing mongo db set up
    this.mongo();
  }

  init() {
    // instantiating a new variable
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      // checking if the static method associate exists in the Model before
      // performing the giving association
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    // setting up a mongo db connection
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
