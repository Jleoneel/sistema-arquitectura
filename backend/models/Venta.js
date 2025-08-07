const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Product = require('./Product');

const Venta = sequelize.define('Venta', {
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'ventas'
});

// Relación
Venta.belongsTo(Product, { foreignKey: 'producto_id' });

module.exports = Venta;
