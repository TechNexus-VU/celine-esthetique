import { useEffect, useState } from "react";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "@/services/firebase/staffService";

import { showSuccess, showError } from "@/utils/toast";

export const useStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await getStaff();
      setStaffList(data);
    } catch (error) {
      console.error(error);
      showError("Failed to load staff.");
    } finally {
      setLoading(false);
    }
  };

  const saveStaff = async (editingId, formData) => {
    try {
      if (editingId) {
        await updateStaff(editingId, formData);
        showSuccess("Staff updated successfully.");
      } else {
        await addStaff(formData);
        showSuccess("Staff added successfully.");
      }

      await fetchStaff();
      return true;
    } catch (error) {
      console.error(error);
      showError("Failed to save staff.");
      return false;
    }
  };

  const removeStaff = async (id) => {
    try {
      await deleteStaff(id);
      showSuccess("Staff deleted successfully.");
      await fetchStaff();
    } catch (error) {
      console.error(error);
      showError("Failed to delete staff.");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return {
    staffList,
    loading,
    saveStaff,
    removeStaff,
  };
};