import React, { useEffect, useState } from "react";

export default function HistorialVentas() {
  const [ventas, setVentas] = useState([]);

  const fetchVentas = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ventas`)
      .then((res) => res.json())
      .then((data) => setVentas(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Historial de Ventas ({ventas.length})
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length > 0 ? (
            ventas.map((venta) => (
              <tr key={venta.id}>
                <td className="p-2 border">{venta.Product?.nombre || "Desconocido"}</td>
                <td className="p-2 border">{venta.cantidad}</td>
                <td className="p-2 border">
                  {new Date(venta.fecha).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-2 text-center">
                No hay ventas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
