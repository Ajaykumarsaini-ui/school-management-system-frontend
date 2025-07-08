import { Routes } from "react-router";
import { SchoolRoutes } from "./SchoolRoutes";
import { TeacherRoutes } from "./TeacherRoutes";
import { StudentRoutes } from "./StudentRoutes";
import { ClientRoutes } from "./ClientRoutes";
// import NotFound from "../pages/NotFound"; // Create this page
import { Route } from "react-router";
import Unauthorized from "../components/Unauthorized";

const AppRoute = () => {
  return (
    <Routes>
      {SchoolRoutes()}
      {TeacherRoutes()}
      {StudentRoutes()}
      {ClientRoutes()}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoute;
