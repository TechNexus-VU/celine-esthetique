import { useState } from "react";

import { showError } from "@/utils/toast";
import { useCoupons } from "@/hooks/useCoupons";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

import CouponForm from "@/components/admin/coupons/CouponForm";
import CouponTable from "@/components/admin/coupons/CouponTable";

const initialFormData = {
  code: "",
  discount: "",
  expiry: "",
  status: "active",
};

const AdminCoupons = () => {
  const { coupons, loading, saveCoupon, removeCoupon } = useCoupons();

  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  const validateForm = () => {
    if (!formData.code || !formData.discount || !formData.expiry) {
      showError("Please fill coupon code, discount, and expiry date.");
      return false;
    }

    if (Number(formData.discount) <= 0 || Number(formData.discount) > 100) {
      showError("Discount must be between 1 and 100.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isSaved = await saveCoupon(editingId, formData);

    if (isSaved) {
      resetForm();
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon.id);

    setFormData({
      code: coupon.code || "",
      discount: coupon.discount || "",
      expiry: coupon.expiry || "",
      status: coupon.status || "active",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDeleteModal = (id) => {
    setSelectedCouponId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await removeCoupon(selectedCouponId);

    setDeleteModalOpen(false);
    setSelectedCouponId(null);
  };

  if (loading) {
    return <Loader text="Loading coupons..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Coupons & Promotions"
        subtitle="Manage discount codes and promotional campaigns."
      />

      <CouponForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {coupons.length === 0 ? (
        <EmptyState
          title="No Coupons Found"
          message="You haven’t created any discount coupons yet."
        />
      ) : (
        <CouponTable
          coupons={coupons}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminCoupons;