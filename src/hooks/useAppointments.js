import { useEffect, useState } from "react";
import {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from"@/services/firebase/appointmentService";
import { showSuccess, showError } from "@/utils/toast";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const saveAppointment = async (editingId, formData) => {
    try {
      if (editingId) {
        await updateAppointment(editingId, formData);
        showSuccess("Appointment updated successfully.");
      } else {
        await addAppointment(formData);
        showSuccess("Appointment added successfully.");
      }

      await fetchAppointments();
      return true;
    } catch (error) {
      console.error("Error saving appointment:", error);
      showError("Failed to save appointment.");
      return false;
    }
  };

  const removeAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      showSuccess("Appointment deleted successfully.");
      await fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      showError("Failed to delete appointment.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    saveAppointment,
    removeAppointment,
  };
};