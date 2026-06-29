import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/public/HomePage";
import Services from "@/pages/public/Services";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminServices from "@/pages/admin/AdminServices";
import AdminAppointments from "@/pages/admin/AdminAppointments";
import AdminStaff from "@/pages/admin/AdminStaff";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminReviews from "@/pages/admin/AdminReviews";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminReports from "@/pages/admin/AdminReports";
import AdminAvailability from "@/pages/admin/AdminAvailability";
import AdminNotifications from "@/pages/admin/AdminNotifications";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminCoupons from "@/pages/admin/AdminCoupons";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import ForgotPassword from "@/components/auth/ForgotPassword";
import AdminProtectedRoute from "@/routes/AdminProtectedRoute";
import AdminCalendar from "@/pages/admin/AdminCalendar";
import AdminProducts from "@/pages/admin/AdminProducts";
import ShopPage from "@/pages/public/ShopPage";
import BlogPage from "@/pages/public/BlogPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
  path="/admin/products"
  element={
    <AdminProtectedRoute>
      <AdminProducts />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/services" element={<AdminServices />} />
      <Route path="/admin/appointments" element={<AdminAppointments/>} />
      <Route
  path="/admin/staff"
  element={
    <AdminProtectedRoute>
      <AdminStaff />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route
  path="/admin/reviews"
  element={
    <AdminProtectedRoute>
      <AdminReviews />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/blog"
  element={
    <AdminProtectedRoute>
      <AdminBlog />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/gallery" element={<AdminGallery />} />
      <Route
  path="/admin/reports"
  element={
    <AdminProtectedRoute>
      <AdminReports />
    </AdminProtectedRoute>
  }
/>
      <Route
  path="/admin/availability"
  element={
    <AdminProtectedRoute>
      <AdminAvailability />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/coupons" element={<AdminCoupons />} />
      <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route
  path="/admin/calendar"
  element={
    <AdminProtectedRoute>
      <AdminCalendar />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;