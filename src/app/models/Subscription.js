import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        // columns
        // as there is no particular columns that exists only on the subscription table,
        // we don't set up anything here. The columns from this model are from the
        // relationship created in the migration.
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // as subscription belongs to one user and one meetup
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.Meetup, {
      foreignKey: 'meetup_id',
      as: 'meetup',
    });
  }
}

export default Subscription;
