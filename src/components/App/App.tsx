import LogIn from "../LogIn/LogIn";
import { BrowserRouter, useRoutes, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import Register from "../Register/Register";
import Menu from "../Menu/Menu";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import ErrorPage from "../Error/ErrorPage";

const AppRoutes = () => {
  let element = useRoutes([
    // Rutas públicas
    { path: "/", element: <LogIn /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    {
      path: "/NotFound",
      element: (
        <ErrorPage
          message={"La ruta indicada no existe"}
          title={"Pagina no encontrada"}
          code={"404"}
        />
      ),
    },

    // Layout principal con menú (rutas protegidas)
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Menu />
          <Outlet />
        </ProtectedRoute>
      ),
      children: [],
    },

    // Redirección para rutas no encontradas
    { path: "*", element: <Navigate to="/NotFound" replace /> },
  ]);

  return element;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
