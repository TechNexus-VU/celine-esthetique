// React
import { useState } from "react";

// Services
import { registerUser } from "@/services/firebase/auth";
import { createUserProfile } from "@/services/firebase/firestore";

// Components
import AdminInput from "@/components/admin/AdminInput";
import AdminButton from "@/components/admin/AdminButton";

// Utils
import { showSuccess, showError } from "@/utils/toast";

const Register = () => {
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

    if (formData.password.length < 6) {
      showError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // Create auth user
      const userCredential = await registerUser(
        formData.email,
        formData.password
      );

      // Save in Firestore
      await createUserProfile(userCredential.user.uid, {
        email: formData.email,
        role: "user",
        createdAt: new Date(),
      });

      showSuccess("Registration successful.");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      showError(error.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-softPink p-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-[420px] rounded-[24px] border border-softPink bg-white p-6 shadow-md md:p-8"
      >
        <div className="mb-6 text-center">
          <h1 className="font-heading text-3xl font-semibold text-darkText md:text-4xl">
            Register
          </h1>

          <p className="mt-2 font-body text-sm text-greyText">
            Create your account to access Celine Esthétique.
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
            text={loading ? "Registering..." : "Register"}
            variant="primary"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;