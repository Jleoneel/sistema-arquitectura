import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Lista de Productos ({products.length})
      </h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.nombre}</td>
                <td className="p-2 border">{p.categoria}</td>
                <td className="p-2 border">${p.precio}</td>
                <td className="p-2 border">{p.cantidad}</td>
                <td className="p-2 border">{p.proveedor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-2 text-center">
                No hay productos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
