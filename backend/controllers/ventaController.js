const Venta = require('../models/Venta');
const Product = require('../models/Product');

exports.registrarVenta = async (req, res) => {
  const { producto_id, cantidad } = req.body;

  try {
    const producto = await Product.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (producto.cantidad < cantidad) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    // Registrar venta
    await Venta.create({ producto_id, cantidad });

    // Descontar stock
    producto.cantidad -= cantidad;
    await producto.save();

    res.json({ message: 'Venta registrada y stock actualizado' });
  } catch (error) {
    console.error('Error al registrar venta:', error);
    res.status(500).json({ message: 'Error al registrar la venta' });
  }
};

// ✅ Función para obtener historial de ventas
exports.obtenerHistorialVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: {
        model: Product,
        attributes: ['nombre'],
      },
      order: [['fecha', 'DESC']],
    });

    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener historial de ventas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

