import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminGuard from "../guards/AdminGuard";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AdminJobs from "../pages/admin/Jobs";
import Companies from "../pages/admin/Companies";
import Applications from "../pages/admin/Applications";
import Settings from "../pages/admin/Settings";
import Home from "../pages/common/Home";
import Jobs from "../pages/common/Jobs";
import Login from "../pages/common/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin */}

        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="companies" element={<Companies />} />
            <Route path="applications" element={<Applications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}