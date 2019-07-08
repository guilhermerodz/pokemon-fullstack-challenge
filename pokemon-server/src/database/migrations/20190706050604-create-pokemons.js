module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('pokemons', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      pokedex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      generation: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        alowNull: false,
      },
      height: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      weight: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      external_picture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      attack: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      defense: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      spa: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      spd: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      speed: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      previous_evolution: {
        type: Sequelize.INTEGER,
        // references: { model: 'pokemons', key: 'id' },
        allowNull: true,
      },
      next_evolution: {
        type: Sequelize.INTEGER,
        // references: { model: 'pokemons', key: 'id' },
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: queryInterface => queryInterface.dropTable('pokemons'),
};
