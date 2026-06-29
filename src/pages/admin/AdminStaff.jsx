import { useState } from "react";

import { showError } from "@/utils/toast";
import { useStaff } from "@/hooks/useStaff";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

import StaffForm from "@/components/admin/staff/StaffForm";
import StaffTable from "@/components/admin/staff/StaffTable";

const initialFormData = {
  name: "",
  role: "",
  services: "",
  phone: "",
  status: "active",
};

const AdminStaff = () => {
  const { staffList, loading, saveStaff, removeStaff } = useStaff();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

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
    if (!formData.name || !formData.role || !formData.services) {
      showError("Please fill all required fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isSaved = await saveStaff(editingId, formData);

    if (isSaved) {
      resetForm();
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.id);

    setFormData({
      name: staff.name || "",
      role: staff.role || "",
      services: staff.services || "",
      phone: staff.phone || "",
      status: staff.status || "active",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDeleteModal = (id) => {
    setSelectedStaffId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await removeStaff(selectedStaffId);

    setDeleteModalOpen(false);
    setSelectedStaffId(null);
  };

  if (loading) {
    return <Loader text="Loading staff..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Staff Management"
        subtitle="Manage salon team and specialists."
      />

      <StaffForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {staffList.length === 0 ? (
        <EmptyState
          title="No Staff Found"
          message="You haven’t added any staff members yet."
        />
      ) : (
        <StaffTable
          staffList={staffList}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Staff Member"
        message="Are you sure you want to delete this staff member?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminStaff;