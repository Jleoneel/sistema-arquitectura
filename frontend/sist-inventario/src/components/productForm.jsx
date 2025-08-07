import React, { useState } from "react";
import Swal from 'sweetalert2';


export default function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    cantidad: "",
    proveedor: "",
    stock_minimo: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newProduct = await res.json();
        console.log("Producto guardado:", newProduct);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Producto creado",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        // Si existe onProductAdded, lo ejecutamos para refrescar la lista
        if (onProductAdded) {
          onProductAdded();
        }

        // Reset del formulario
        setFormData({
          nombre: "",
          precio: "",
          categoria: "",
          cantidad: "",
          proveedor: "",
          stock_minimo: "",
          descripcion: "",
        });
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="proveedor"
          placeholder="Proveedor"
          value={formData.proveedor}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="stock_minimo"
          placeholder="Stock mínimo"
          value={formData.stock_minimo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        className="border p-2 rounded w-full mt-4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
      >
        Guardar Producto
      </button>
    </form>
  );
}
