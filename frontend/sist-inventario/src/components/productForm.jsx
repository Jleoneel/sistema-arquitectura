// src/components/ProductForm.jsx
import { useState } from 'react';

const ProductForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    supplier: '',
    minStock: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.name || !form.price || !form.quantity || !form.category) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    try {
      // Aquí puedes conectar al backend
      // const res = await fetch('http://localhost:3000/api/products', { ... });

      onCreate(form); // Llama a la función del padre
      alert('Producto agregado');
      setForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        supplier: '',
        minStock: ''
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('No se pudo agregar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Agregar Producto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Categoría *"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="input"
        />
        <input
          type="number"
          placeholder="Precio *"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="input"
        />
        <input
          type="number"
          placeholder="Cantidad *"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Proveedor"
          value={form.supplier}
          onChange={(e) => setForm({ ...form, supplier: e.target.value })}
          className="input"
        />
        <input
          type="number"
          placeholder="Stock mínimo"
          value={form.minStock}
          onChange={(e) => setForm({ ...form, minStock: e.target.value })}
          className="input"
        />
      </div>

      <textarea
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        rows={3}
      ></textarea>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Guardar Producto
      </button>
    </form>
  );
};

export default ProductForm;
