import { Edit2, Trash2 } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Productos</h2>
        <p className="text-gray-600 mt-2">
          {products.length} producto{products.length !== 1 && 's'} en inventario
        </p>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50 text-sm text-gray-500 uppercase text-left">
          <tr>
            <th className="px-6 py-3">Producto</th>
            <th className="px-6 py-3">Categoría</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Proveedor</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="font-semibold text-gray-900">{product.name}</div>
                <div className="text-gray-500">{product.description}</div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-800">${product.price}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.quantity <= product.minStock
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {product.quantity} unidades
                </span>
              </td>
              <td className="px-6 py-4 text-gray-700">{product.supplier}</td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-10 text-gray-500">
                No hay productos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
