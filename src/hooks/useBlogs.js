import { useEffect, useState } from "react";
import {
  addBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "@/services/firebase/blogService";

import { showSuccess, showError } from "@/utils/toast";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
      showError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  const saveBlog = async (editingId, formData) => {
    try {
      if (editingId) {
        await updateBlog(editingId, formData);
        showSuccess("Blog updated successfully.");
      } else {
        await addBlog(formData);
        showSuccess("Blog added successfully.");
      }

      await fetchBlogs();
      return true;
    } catch (error) {
      console.error(error);
      showError("Failed to save blog.");
      return false;
    }
  };

  const removeBlog = async (id) => {
    try {
      await deleteBlog(id);
      showSuccess("Blog deleted successfully.");
      await fetchBlogs();
    } catch (error) {
      console.error(error);
      showError("Failed to delete blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    saveBlog,
    removeBlog,
  };
};