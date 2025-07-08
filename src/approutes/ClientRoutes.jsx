import { Route } from "react-router";
import Client from "../pages/Client/Client";
import Home from "../pages/Client/components/home/Home";
import Login from "../pages/Client/components/login/Login";
import Register from "../pages/Client/components/register/Register";
import Logout from "../pages/Client/components/logout/Logout.jsx";

export const ClientRoutes = () => (
  <Route path="/" element={<Client />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="logout" element={<Logout />} />
  </Route>
);
