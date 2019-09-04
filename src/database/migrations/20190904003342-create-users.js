module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, // this column will be the primary key for this table
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // it won't exist an user without name
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // it won't exist two or more equal emails
      },
      password_hash: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('users');
  },
};
