const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");
const Producto = require("../models/Product");

router.post("/", async (req, res) => {
  const { producto_id, cantidad } = req.body;

  try {
    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (producto.cantidad < cantidad) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    const venta = await Venta.create({
      producto_id,
      cantidad,
      fecha: new Date(),
    });

    producto.cantidad -= cantidad;
    await producto.save();

    res.status(201).json({ message: "Venta registrada correctamente", venta });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
});

module.exports = router;
