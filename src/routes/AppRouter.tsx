import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";



import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AdminJobs from "../pages/admin/Jobs";
import Home from "../pages/common/Home";
import Jobs from "../pages/admin/Jobs";
import Login from "../pages/common/Login";
import Register from "../pages/common/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Route>

        {/* Admin */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="jobs" element={<AdminJobs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}