import Sequelize, { Model } from 'sequelize';

class Pokemon extends Model {
  static init(sequelize) {
    super.init(
      {
        pokedex: Sequelize.INTEGER,
        generation: Sequelize.INTEGER,
        name: Sequelize.STRING,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        height: Sequelize.DECIMAL,
        weight: Sequelize.DECIMAL,
        external_picture: Sequelize.STRING,
        hp: Sequelize.INTEGER,
        attack: Sequelize.INTEGER,
        defense: Sequelize.INTEGER,
        spa: Sequelize.INTEGER,
        spd: Sequelize.INTEGER,
        speed: Sequelize.INTEGER,
        previous_evolution: Sequelize.INTEGER,
        next_evolution: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Pokemon;
