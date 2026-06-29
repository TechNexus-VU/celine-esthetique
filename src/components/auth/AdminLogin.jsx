import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "@/services/firebase/auth";
import { getUserProfile } from "@/services/firebase/firestore";

import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";

import { showSuccess, showError } from "@/utils/toast";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      showError("Please enter email and password.");
      return false;
    }

    return true;
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const userCredential = await loginUser(
        formData.email,
        formData.password
      );

      const profile = await getUserProfile(userCredential.user.uid);

      if (profile?.role !== "admin") {
        showError("Access denied. You are not an admin.");
        return;
      }

      showSuccess("Admin login successful.");
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Admin login error:", error);
      showError(error.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-softPink p-4">
      <form
        onSubmit={handleAdminLogin}
        className="w-full max-w-[420px] rounded-[24px] border border-softPink bg-white p-6 shadow-md md:p-8"
      >
        <div className="mb-6 text-center">
          <h1 className="font-heading text-3xl font-semibold text-darkText md:text-4xl">
            Admin Login
          </h1>

          <p className="mt-2 font-body text-sm text-greyText">
            Sign in to manage Celine Esthétique dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <AdminInput
            name="email"
            type="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
          />

          <AdminInput
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <AdminButton
            type="submit"
            text={loading ? "Logging in..." : "Login as Admin"}
            variant="primary"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;