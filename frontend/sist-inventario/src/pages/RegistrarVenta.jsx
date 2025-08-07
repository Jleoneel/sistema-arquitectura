import React, { useState, useEffect } from "react";

export default function RegistrarVenta() {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto_id: parseInt(productoId),
          cantidad: parseInt(cantidad),
        }),
      });

      if (!res.ok) throw new Error("Error al registrar venta");

      const result = await res.json();
      setMensaje("Venta registrada correctamente");

      // Reset formulario
      setProductoId("");
      setCantidad("");
      setPrecioUnitario(0);
      setTotal(0);

      // Opcional: Actualiza productos para reflejar nuevo stock
      const productosRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      const productosData = await productosRes.json();
      setProductos(productosData);
    } catch (error) {
      setMensaje("Error al registrar la venta");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Registrar Venta</h2>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-semibold">{mensaje}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={productoId}
          onChange={(e) => {
            const id = e.target.value;
            setProductoId(id);
            const producto = productos.find((p) => p.id == id);
            if (producto) setPrecioUnitario(producto.precio);
            setCantidad(""); // Reset cantidad cuando cambias de producto
            setTotal(0);
          }}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Selecciona un producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - Stock: {p.cantidad}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => {
            const cant = e.target.value;
            setCantidad(cant);
            setTotal(precioUnitario * cant);
          }}
          className="w-full border rounded p-2"
          min="1"
          required
        />

        {total > 0 && (
          <div className="text-center font-semibold text-green-600">
            Total: ${total.toFixed(2)}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Registrar Venta
        </button>
      </form>
    </div>
  );
}
