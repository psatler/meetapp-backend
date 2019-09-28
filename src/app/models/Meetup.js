import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        // columns
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
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
