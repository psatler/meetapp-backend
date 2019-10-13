module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, // this column will be the primary key for this table
      },
      user_id: {
        type: Sequelize.INTEGER,
        // creating a reference to the column id of users table
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE', // if we modify the user on the users table, we modify it on the subscription table as well
        onDelete: 'CASCADE', // if we delete the user on the users table,  we delete it on the subscription table
        allowNull: false,
      },
      meetup_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'meetups',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      // below columns will be automatically updated by sequelize
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subscriptions');
  },
};
