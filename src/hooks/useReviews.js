import { useEffect, useState } from "react";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} from "@/services/firebase/reviewService";

import { showSuccess, showError } from "@/utils/toast";

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      showError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  const saveReview = async (editingId, formData) => {
    try {
      if (editingId) {
        await updateReview(editingId, formData);
        showSuccess("Review updated successfully.");
      } else {
        await addReview(formData);
        showSuccess("Review added successfully.");
      }

      await fetchReviews();
      return true;
    } catch (error) {
      console.error("Error saving review:", error);
      showError("Failed to save review.");
      return false;
    }
  };

  const removeReview = async (id) => {
    try {
      await deleteReview(id);
      showSuccess("Review deleted successfully.");
      await fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      showError("Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    saveReview,
    removeReview,
  };
};