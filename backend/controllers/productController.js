const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear producto', error: err });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.update(req.body, { where: { id } });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar', error: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar', error: err });
  }
};
