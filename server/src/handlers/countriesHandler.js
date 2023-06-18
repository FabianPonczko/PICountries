const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const getCountriesHandler = async (req, res) => {
  const { id }  = req.params;
  const { name } = req.query;
  try {
    if (id) {
      const country = await Country.findByPk(id, {
        include: {
          model: Activity,
          through: { attributes: [] }, // Omitir las columnas adicionales de la tabla de asociación
        },
      });
      if (country) {
        return res.status(200).json(country);
      } else {
        return res.status(404).json({ message: "País no encontrado" });
      }
    }

    let countries;
    if (!name) {
      countries = await Country.findAll({
        include: {
          model: Activity,
          through: { attributes: [] }, // Omitir las columnas adicionales de la tabla de asociación
        },
      });
    } else {
      countries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Activity,
          through: { attributes: [] }, // Omitir las columnas adicionales de la tabla de asociación
        },
      });
    }
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCountriesHandler;