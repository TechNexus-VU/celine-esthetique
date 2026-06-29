import { useEffect, useState } from "react";
import {
  getSettings,
  saveSettings,
} from "@/services/firebase/settingService";

import { showSuccess, showError } from "@/utils/toast";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import Loader from "@/components/admin/Loader";

const initialSettings = {
  salonName: "Celine Esthétique",
  phone: "+41 78 949 40 39",
  email: "info@celineesthetic.com",
  address: "Cheneau-de-Bourg Street, Billens Stairs 1, 1003 Lausanne",
  advanceBookingDays: "30",
  cancellationHours: "24",
  reminderType: "1_day",
};

const AdminSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();

      if (data) {
        setSettings({
          ...initialSettings,
          ...data,
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      showError("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateSettings = () => {
    if (!settings.salonName || !settings.phone || !settings.email) {
      showError("Please fill salon name, phone, and email.");
      return false;
    }

    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateSettings()) return;

    try {
      setSaving(true);
      await saveSettings(settings);
      showSuccess("Settings saved successfully.");
      await fetchSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
      showError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading settings..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Admin Settings"
        subtitle="Manage salon profile, contact details, booking rules, and account settings."
      />

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:p-6">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
              Salon Information
            </h2>

            <div className="space-y-4">
              <AdminInput
                name="salonName"
                type="text"
                placeholder="Salon Name"
                value={settings.salonName}
                onChange={handleChange}
              />

              <AdminInput
                name="phone"
                type="text"
                placeholder="Phone Number"
                value={settings.phone}
                onChange={handleChange}
              />

              <AdminInput
                name="email"
                type="email"
                placeholder="Email Address"
                value={settings.email}
                onChange={handleChange}
              />

              <textarea
                name="address"
                rows="4"
                placeholder="Salon Address"
                value={settings.address}
                onChange={handleChange}
                className="w-full rounded-[14px] border border-softPink bg-white px-4 py-3 font-body text-darkText outline-none transition-all duration-300 focus:border-primaryPink focus:ring-2 focus:ring-softPink"
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:p-6">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
              Booking Rules
            </h2>

            <div className="space-y-4">
              <AdminSelect
                name="advanceBookingDays"
                value={settings.advanceBookingDays}
                onChange={handleChange}
              >
                <option value="30">Allow booking 30 days in advance</option>
                <option value="60">Allow booking 60 days in advance</option>
                <option value="90">Allow booking 90 days in advance</option>
              </AdminSelect>

              <AdminSelect
                name="cancellationHours"
                value={settings.cancellationHours}
                onChange={handleChange}
              >
                <option value="12">Cancel before 12 hours</option>
                <option value="24">Cancel before 24 hours</option>
                <option value="48">Cancel before 48 hours</option>
              </AdminSelect>

              <AdminSelect
                name="reminderType"
                value={settings.reminderType}
                onChange={handleChange}
              >
                <option value="1_day">Reminder: 1 day before appointment</option>
                <option value="2_hours">Reminder: 2 hours before appointment</option>
                <option value="both">Reminder: Both</option>
              </AdminSelect>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <AdminButton
            type="submit"
            text={saving ? "Saving..." : "Save Settings"}
            variant="primary"
            disabled={saving}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;