import { useState } from "react";

import { showError } from "@/utils/toast";
import { useProducts } from "@/hooks/useProducts";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

import ProductForm from "@/components/admin/products/ProductForm";
import ProductTable from "@/components/admin/products/ProductTable";

const initialFormData = {
  name: "",
  category: "",
  price: "",
  oldPrice: "",
  stock: "",
  imageURL: "",
  status: "available",
};

const AdminProducts = () => {
  const { products, loading, saveProduct, removeProduct } = useProducts();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
    if (!formData.name || !formData.category || !formData.price) {
      showError("Please fill product name, category, and price.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isSaved = await saveProduct(editingId, formData);

    if (isSaved) {
      resetForm();
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      stock: product.stock || "",
      imageURL: product.imageURL || "",
      status: product.status || "available",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await removeProduct(selectedProductId);

    setDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  if (loading) {
    return <Loader text="Loading products..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Product Management"
        subtitle="Add, update, and manage shop products."
      />

      <ProductForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {products.length === 0 ? (
        <EmptyState
          title="No Products Found"
          message="You haven’t added any shop products yet."
        />
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminProducts;