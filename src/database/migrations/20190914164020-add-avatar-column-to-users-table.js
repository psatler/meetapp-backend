module.exports = {
  up: (queryInterface, Sequelize) => {
    // adding a column avatar_id to the users table
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: {
        // avatar_id references the column id of the table files
        model: 'files',
        key: 'id',
      },
      onUpdate: 'CASCADE', // if we modify the image on the files table, we modify it on the user table as well
      onDelete: 'SET NULL', // if we delete the image on the files table, we set the avatar_id as NULL on the users table
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
