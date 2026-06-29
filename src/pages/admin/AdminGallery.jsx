import { useState } from "react";

import { showError } from "@/utils/toast";
import { useGallery } from "@/hooks/useGallery";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

import GalleryForm from "@/components/admin/gallery/GalleryForm";
import GalleryGrid from "@/components/admin/gallery/GalleryGrid";

const initialFormData = {
  title: "",
  category: "",
  status: "published",
};

const AdminGallery = () => {
  const {
    galleryItems,
    loading,
    saving,
    saveGalleryItem,
    removeGalleryItem,
  } = useGallery();

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
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
    if (!formData.title || !formData.category) {
      showError("Please fill title and category.");
      return false;
    }

    if (!editingId && !imageFile) {
      showError("Please upload an image.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isSaved = await saveGalleryItem(
      editingId,
      formData,
      imageFile
    );

    if (isSaved) {
      resetForm();
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",
      category: item.category || "",
      status: item.status || "published",
    });

    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await removeGalleryItem(
      selectedItem.id,
      selectedItem.imagePath
    );

    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <Loader text="Loading gallery..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Gallery Management"
        subtitle="Upload, update, and manage salon gallery images."
      />

      <GalleryForm
        formData={formData}
        editingId={editingId}
        saving={saving}
        onChange={handleChange}
        onImageChange={(e) => setImageFile(e.target.files[0])}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {galleryItems.length === 0 ? (
        <EmptyState
          title="No Gallery Images"
          message="You haven’t uploaded any gallery images yet."
        />
      ) : (
        <GalleryGrid
          galleryItems={galleryItems}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Gallery Image"
        message="Are you sure you want to delete this image?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminGallery;