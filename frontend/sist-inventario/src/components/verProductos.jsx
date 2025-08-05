import React, { useState, useEffect } from 'react';
import ProductForm from './productForm';
import ProductTable from './ProductTable';

export default function VerProductos() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    console.log("Editar:", product);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts(); // Recargar lista después de eliminar
    } catch (err) {
      console.error('Error al eliminar producto:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pasamos fetchProducts como onProductAdded */}
      <ProductForm onProductAdded={fetchProducts} />
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
