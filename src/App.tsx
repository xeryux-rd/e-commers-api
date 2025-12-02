import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ProductsListPage from "./pages/ProductsListPage";
import UsersListPage from "./pages/UsersListPage";
import CartPage from "./pages/CartPage";
import { Routes, Route } from "react-router-dom";
import ProductFormPage from "./pages/ProductFormPage";


function App() {
  return (
    <div className="min-h-screen">
      <ProtectedRoute>
        <Navbar />
      </ProtectedRoute>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <ProductFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carts"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
