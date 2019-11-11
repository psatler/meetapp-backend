import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        // columns
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          // this columns does not exist in DB. It is used to serve the file to be displayed on frontend
          type: Sequelize.VIRTUAL,
          get() {
            const staticFileURL = `${process.env.APP_URL}/files/${this.path}`;
            return staticFileURL;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
