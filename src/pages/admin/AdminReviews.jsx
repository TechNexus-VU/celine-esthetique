import { useState } from "react";

import { showError } from "@/utils/toast";
import { useReviews } from "@/hooks/useReviews";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

import ReviewForm from "@/components/admin/reviews/ReviewForm";
import ReviewTable from "@/components/admin/reviews/ReviewTable";

const initialFormData = {
  client: "",
  service: "",
  rating: "5",
  comment: "",
  status: "pending",
};

const AdminReviews = () => {
  const { reviews, loading, saveReview, removeReview } = useReviews();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.client || !formData.service || !formData.comment) {
      showError("Please fill client name, service, and review comment.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isSaved = await saveReview(editingId, formData);

    if (isSaved) {
      resetForm();
    }
  };

  const handleEdit = (review) => {
    setEditingId(review.id);

    setFormData({
      client: review.client || "",
      service: review.service || "",
      rating: review.rating || "5",
      comment: review.comment || "",
      status: review.status || "pending",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDeleteModal = (id) => {
    setSelectedReviewId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await removeReview(selectedReviewId);

    setDeleteModalOpen(false);
    setSelectedReviewId(null);
  };

  if (loading) {
    return <Loader text="Loading reviews..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Review Management"
        subtitle="Manage client feedback and review approval status."
      />

      <ReviewForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {reviews.length === 0 ? (
        <EmptyState
          title="No Reviews Found"
          message="No client reviews have been added yet."
        />
      ) : (
        <ReviewTable
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminReviews;