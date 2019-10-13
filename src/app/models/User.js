import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // columns
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // this only exist on the code's side
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // to create the relationship between the avatar image stored in the files
  // table with its respective user in the users table
  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
    // an user has several subscriptions and can also organize several meetups
    this.hasMany(models.Subscription, {
      foreignKey: 'user_id', // The name of the foreign key in the target table
      as: 'user',
    });
    this.hasMany(models.Meetup); // user_id is also the foreign key in the Meetup that represents the user
  }

  // compare the password typed with its stored hash
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
