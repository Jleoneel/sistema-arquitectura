import React, { useState, useEffect } from 'react';

export default function RegistrarVenta() {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto_id: productoId,
          cantidad: parseInt(cantidad, 10)
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Venta registrada correctamente');
        setProductoId('');
        setCantidad('');
      } else {
        setMensaje(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error('Error al registrar venta:', error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Registrar Venta</h2>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-semibold">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Selecciona un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} - Stock: {p.cantidad}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="w-full border rounded p-2"
          min="1"
          required
        />

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
