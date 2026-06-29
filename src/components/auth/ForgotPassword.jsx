import { useState } from "react";

import { forgotPassword } from "@/services/firebase/auth";

import AdminInput from "@/components/admin/AdminInput";
import AdminButton from "@/components/admin/AdminButton";

import { showSuccess, showError } from "@/utils/toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email) {
      showError("Please enter your email.");
      return false;
    }

    return true;
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await forgotPassword(email);

      showSuccess("Password reset email sent successfully.");
      setEmail("");
    } catch (error) {
      console.error("Password reset error:", error);
      showError(error.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-softPink p-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-[420px] rounded-[24px] border border-softPink bg-white p-6 shadow-md md:p-8"
      >
        <div className="mb-6 text-center">
          <h1 className="font-heading text-3xl font-semibold text-darkText md:text-4xl">
            Forgot Password
          </h1>

          <p className="mt-2 font-body text-sm text-greyText">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="space-y-4">
          <AdminInput
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <AdminButton
            type="submit"
            text={loading ? "Sending..." : "Send Reset Link"}
            variant="primary"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;