import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        // columns
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            // a custom getter for this virtual field to return a boolean to show
            // if this meetup date has passed the current date or not
            return isBefore(this.date, new Date());
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // using this method to create the relationship between tables
  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'banner_image_id',
      as: 'banner',
    });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'organizer',
    });
  }
}

export default Meetup;
