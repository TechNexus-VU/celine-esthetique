// React
import { useState } from "react";

// Packages
import { useNavigate } from "react-router-dom";

// Services
import { loginUser } from "@/services/firebase/auth";
import { getUserProfile } from "@/services/firebase/firestore";

// Components
import AdminInput from "@/components/admin/AdminInput";
import AdminButton from "@/components/admin/AdminButton";

// Utils
import { showSuccess, showError } from "@/utils/toast";

const Login = () => {
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const userCredential = await loginUser(
        formData.email,
        formData.password
      );

      const profile = await getUserProfile(userCredential.user.uid);

      showSuccess("Login successful.");

      if (profile?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      showError(error.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-softPink p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-[420px] rounded-[24px] border border-softPink bg-white p-6 shadow-md md:p-8"
      >
        <div className="mb-6 text-center">
          <h1 className="font-heading text-3xl font-semibold text-darkText md:text-4xl">
            Login
          </h1>

          <p className="mt-2 font-body text-sm text-greyText">
            Sign in to access your account.
          </p>
        </div>

        <div className="space-y-4">
          <AdminInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <AdminInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <AdminButton
            type="submit"
            text={loading ? "Logging in..." : "Login"}
            variant="primary"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;