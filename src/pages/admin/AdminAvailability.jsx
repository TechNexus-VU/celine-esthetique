import { useState } from "react";

import { showError } from "@/utils/toast";
import { useAvailability } from "@/hooks/useAvailability";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

import AvailabilityForm from "@/components/admin/availability/AvailabilityForm";
import AvailabilityTable from "@/components/admin/availability/AvailabilityTable";

const initialFormData = {
  day: "",
  startTime: "",
  endTime: "",
  status: "open",
  note: "",
};

const AdminAvailability = () => {
  const {
    availabilityList,
    loading,
    saveAvailability,
    removeAvailability,
  } = useAvailability();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState(null);

  // Reset Form
  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate Form
  const validateForm = () => {
    if (!formData.day || !formData.startTime || !formData.endTime) {
      showError("Please select day, start time, and end time.");
      return false;
    }

    if (formData.startTime >= formData.endTime) {
      showError("End time must be greater than start time.");
      return false;
    }

    return true;
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isSaved = await saveAvailability(editingId, formData);

    if (isSaved) {
      resetForm();
    }
  };

  // Edit Availability
  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      day: item.day || "",
      startTime: item.startTime || "",
      endTime: item.endTime || "",
      status: item.status || "open",
      note: item.note || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setSelectedAvailabilityId(id);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleDelete = async () => {
    await removeAvailability(selectedAvailabilityId);

    setDeleteModalOpen(false);
    setSelectedAvailabilityId(null);
  };

  if (loading) {
    return <Loader text="Loading availability..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Availability Settings"
        subtitle="Set salon opening hours, breaks, holidays, and closed days."
      />

      {/* Form */}
      <AvailabilityForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {/* Table */}
      {availabilityList.length === 0 ? (
        <EmptyState
          title="No Availability Found"
          message="You haven’t added any availability settings yet."
        />
      ) : (
        <AvailabilityTable
          availabilityList={availabilityList}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Availability"
        message="Are you sure you want to delete this availability setting?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminAvailability;