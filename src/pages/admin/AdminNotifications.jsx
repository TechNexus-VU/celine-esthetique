import { useEffect, useState } from "react";
import {
  addNotification,
  getNotifications,
} from "@/services/firebase/adminNotificationService";

import { showSuccess, showError } from "@/utils/toast";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import AdminTable from "@/components/admin/AdminTable";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import StatusBadge from "@/components/admin/StatusBadge";

const initialFormData = {
  title: "",
  audience: "All Clients",
  message: "",
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      showError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.message) {
      showError("Please fill title and message.");
      return false;
    }

    return true;
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSending(true);

      await addNotification(formData);

      showSuccess("Notification saved successfully.");
      await fetchNotifications();
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error sending notification:", error);
      showError("Failed to save notification.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <Loader text="Loading notifications..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Push Notifications"
        subtitle="Send broadcast notifications to clients about offers, reminders, and updates."
      />

      <form
        onSubmit={handleSend}
        className="mb-8 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:p-6"
      >
        <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
          Create Notification
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AdminInput
            name="title"
            type="text"
            placeholder="Notification Title"
            value={formData.title}
            onChange={handleChange}
          />

          <AdminSelect
            name="audience"
            value={formData.audience}
            onChange={handleChange}
          >
            <option value="All Clients">All Clients</option>
            <option value="Active Clients">Active Clients</option>
            <option value="New Clients">New Clients</option>
          </AdminSelect>

          <textarea
            name="message"
            placeholder="Notification message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="rounded-[14px] border border-softPink bg-white px-4 py-3 font-body text-darkText outline-none transition-all duration-300 focus:border-primaryPink focus:ring-2 focus:ring-softPink md:col-span-2"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <AdminButton
            type="submit"
            text={sending ? "Sending..." : "Send Notification"}
            variant="primary"
            disabled={sending}
          />
        </div>
      </form>

      {notifications.length === 0 ? (
        <EmptyState
          title="No Notifications Found"
          message="No notification history available yet."
        />
      ) : (
        <div>
          <h2 className="mb-5 font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Notification History
          </h2>

          <AdminTable
            headers={["Title", "Audience", "Message", "Status"]}
          >
            {notifications.map((item) => (
              <tr
                key={item.id}
                className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
              >
                <td className="py-4 font-medium text-darkText">
                  {item.title}
                </td>

                <td className="py-4 text-greyText">
                  {item.audience}
                </td>

                <td className="max-w-[350px] py-4 text-greyText">
                  {item.message}
                </td>

                <td className="py-4">
                  <StatusBadge status={item.status || "sent"} />
                </td>
              </tr>
            ))}
          </AdminTable>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;