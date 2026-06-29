import { useEffect, useState } from "react";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@/services/firebase/productService";

import { showSuccess, showError } from "@/utils/toast";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      showError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (editingId, formData) => {
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        showSuccess("Product updated successfully.");
      } else {
        await addProduct(formData);
        showSuccess("Product added successfully.");
      }

      await fetchProducts();
      return true;
    } catch (error) {
      console.error(error);
      showError("Failed to save product.");
      return false;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      showSuccess("Product deleted successfully.");
      await fetchProducts();
    } catch (error) {
      console.error(error);
      showError("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    saveProduct,
    removeProduct,
  };
};