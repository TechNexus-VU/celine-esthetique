import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import { getAppointments } from "@/services/firebase/appointmentService";
import { showError, showInfo } from "@/utils/toast";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const appointments = await getAppointments();

      const formattedEvents = appointments
        .filter((item) => item.date && item.time)
        .map((item) => {
          const startDate = new Date(`${item.date}T${item.time}`);
          const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

          return {
            title: `${item.customerName} - ${item.service}`,
            start: startDate,
            end: endDate,
            staff: item.staff,
            status: item.status,
            email: item.email,
          };
        });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error loading appointments:", error);
      showError("Failed to load booking calendar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSelectEvent = (event) => {
    showInfo(
      `Customer: ${event.title} | Staff: ${event.staff || "-"} | Status: ${
        event.status || "-"
      }`
    );
  };

  const eventStyleGetter = (event) => {
    const statusColors = {
      pending: "#F59E0B",
      confirmed: "#E83E8C",
      completed: "#87A96B",
      cancelled: "#800020",
    };

    return {
      style: {
        backgroundColor: statusColors[event.status] || "#D4AF37",
        borderRadius: "10px",
        border: "none",
        padding: "4px 8px",
        fontFamily: "Poppins, sans-serif",
        fontSize: "13px",
      },
    };
  };

  if (loading) {
    return <Loader text="Loading calendar..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Booking Calendar"
        subtitle="View all customer bookings and appointments."
      />

      {events.length === 0 ? (
        <EmptyState
          title="No Bookings Found"
          message="No appointments are available in the calendar yet."
        />
      ) : (
        <div className="h-[650px] overflow-hidden rounded-[24px] border border-softPink bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:h-[750px] md:p-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            style={{ height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;