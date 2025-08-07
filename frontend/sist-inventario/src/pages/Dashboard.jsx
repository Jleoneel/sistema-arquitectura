import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Package, Plus } from "lucide-react";
import ProductForm from "../components/productForm";
import ProductTable from "../components/ProductTable";
import RegistrarVenta from "../pages/RegistrarVenta";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentView, setCurrentView] = useState("productos");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCreateProduct = (newProduct) => {
    if (editingProduct) {
      // Actualizar
      const updated = products.map((p) =>
        p.id === editingProduct.id ? { ...editingProduct, ...newProduct } : p
      );
      setProducts(updated);
      setEditingProduct(null);
    } else {
      // Crear
      const newWithID = { ...newProduct, id: Date.now() };
      setProducts([...products, newWithID]);
    }
    setShowAddForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = (id) => {
    const confirmar = confirm("¿Deseas eliminar este producto?");
    if (confirmar) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Package className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Sistema de Inventario
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hola,</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Menú</h2>
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setCurrentView("agregar");
                  setEditingProduct(null);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar Producto</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView("productos");
                  setEditingProduct(null);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
              >
                <Package className="w-5 h-5" />
                <span>Ver Productos</span>
              </button>

              <button
                onClick={() => setCurrentView("ventas")}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
              >
                <Package className="w-5 h-5" />
                <span>Registrar Venta</span>
              </button>
            </nav>
          </div>

          {/* Área principal */}
          <div className="flex-1 space-y-6">
            {currentView === "agregar" && (
              <ProductForm
                onCreate={handleCreateProduct}
                initialData={editingProduct}
              />
            )}

            {currentView === "productos" && (
              <ProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}

            {currentView === "ventas" && <RegistrarVenta />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
