import { Routes as Router, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/Auth.context";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import Events from "./pages/Events";
import EventSingle from "./pages/EventSingle";
import Loading from "./components/Loading";
import { ReactNode } from "react";

interface RouteProps {
  element: ReactNode;
}

const PrivateRoute = ({ element }: RouteProps) => {
  const { authenticated, loadingAuth } = useAuth();

  if (loadingAuth) return <Loading />;

  if (!authenticated) return <Navigate to="/entre" replace />;

  return element;
};

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<App />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/entre" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/eventos" element={<PrivateRoute element={<Events />} />} />
      <Route path="/perfil" element={<PrivateRoute element={<Profile />} />} />
      <Route
        path="/evento/:id"
        element={<PrivateRoute element={<EventSingle />} />}
      />
    </Router>
  );
};

export default Routes;
