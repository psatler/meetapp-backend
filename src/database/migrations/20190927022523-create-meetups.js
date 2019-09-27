module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetups', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      banner_image_id: {
        type: Sequelize.INTEGER,
        references: {
          // banner_image_id references the column id of the table files
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE', // if we modify the image on the files table, we modify it on the user table as well
        onDelete: 'CASCADE', // if we delete the image on the files table, we delete it on the users table
        allowNull: false,
      },
      // id of the organizer of the meetup
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          // user_id references the column id of the table files
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE', // if we modify the image on the files table, we modify it on the user table as well
        onDelete: 'CASCADE', // if we delete the image on the files table,  we delete it on the users table
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

  down: queryInterface => {
    return queryInterface.dropTable('meetups');
  },
};
