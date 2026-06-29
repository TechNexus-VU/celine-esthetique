import { useState } from "react";

import { showError } from "@/utils/toast";
import { useBlogs } from "@/hooks/useBlogs";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

import BlogForm from "@/components/admin/blog/BlogForm";
import BlogTable from "@/components/admin/blog/BlogTable";

const initialFormData = {
  title: "",
  category: "",
  author: "Admin",
  status: "draft",
  content: "",
};

const AdminBlog = () => {
  const { blogs, loading, saveBlog, removeBlog } = useBlogs();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

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
    if (!formData.title || !formData.category || !formData.content) {
      showError("Please fill title, category, and content.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const isSaved = await saveBlog(editingId, formData);

    if (isSaved) {
      resetForm();
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);

    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "Admin",
      status: blog.status || "draft",
      content: blog.content || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDeleteModal = (id) => {
    setSelectedBlogId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await removeBlog(selectedBlogId);

    setDeleteModalOpen(false);
    setSelectedBlogId(null);
  };

  if (loading) {
    return <Loader text="Loading blogs..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Blog Management"
        subtitle="Create, update, publish, and manage blog posts."
      />

      <BlogForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {blogs.length === 0 ? (
        <EmptyState
          title="No Blogs Found"
          message="You haven’t added any blog posts yet."
        />
      ) : (
        <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={openDeleteModal} />
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Blog"
        message="Are you sure you want to delete this blog post?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminBlog;