// React
import { useEffect, useState } from "react";

// Services
import {
  addAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
} from "@/services/firebase/availabilityService";

// Utils
import { showSuccess, showError } from "@/utils/toast";

export const useAvailability = () => {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const data = await getAvailability();
      setAvailabilityList(data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      showError("Failed to load availability settings.");
    } finally {
      setLoading(false);
    }
  };

  const saveAvailability = async (editingId, formData) => {
    try {
      if (editingId) {
        await updateAvailability(editingId, formData);
        showSuccess("Availability updated successfully.");
      } else {
        await addAvailability(formData);
        showSuccess("Availability added successfully.");
      }

      await fetchAvailability();
      return true;
    } catch (error) {
      console.error("Error saving availability:", error);
      showError("Failed to save availability.");
      return false;
    }
  };

  const removeAvailability = async (id) => {
    try {
      await deleteAvailability(id);
      showSuccess("Availability deleted successfully.");
      await fetchAvailability();
    } catch (error) {
      console.error("Error deleting availability:", error);
      showError("Failed to delete availability.");
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return {
    availabilityList,
    loading,
    saveAvailability,
    removeAvailability,
  };
};