import { useEffect, useState } from "react";
import { getAppointments } from "@/services/firebase/appointmentService";
import { getServices } from "@/services/firebase/serviceService";

import { showError } from "@/utils/toast";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";

const AdminReports = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReportsData = async () => {
    try {
      setLoading(true);

      const appointmentsData = await getAppointments();
      const servicesData = await getServices();

      setAppointments(appointmentsData);
      setServices(servicesData);
    } catch (error) {
      console.error("Error loading reports:", error);
      showError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const totalAppointments = appointments.length;

  const completedAppointments = appointments.filter(
    (item) => item.status === "completed"
  ).length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "pending"
  ).length;

  const cancelledAppointments = appointments.filter(
    (item) => item.status === "cancelled"
  ).length;

  const totalServices = services.length;

  const completedRevenue = appointments
    .filter((item) => item.status === "completed")
    .reduce((total, item) => {
      const matchedService = services.find(
        (service) => service.name === item.service
      );

      const price = Number(
        String(matchedService?.price || "0").replace(/[^\d.]/g, "")
      );

      return total + price;
    }, 0);

  const reportCards = [
    {
      title: "Total Appointments",
      value: totalAppointments,
    },
    {
      title: "Completed",
      value: completedAppointments,
    },
    {
      title: "Pending",
      value: pendingAppointments,
    },
    {
      title: "Cancelled",
      value: cancelledAppointments,
    },
    {
      title: "Total Services",
      value: totalServices,
    },
    {
      title: "Estimated Revenue",
      value: completedRevenue,
    },
  ];

  if (loading) {
    return <Loader text="Loading reports..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Sales Reports"
        subtitle="Track appointments, completed bookings, services, and estimated revenue."
      />

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {reportCards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>

      {appointments.length === 0 ? (
        <EmptyState
          title="No Report Data"
          message="No appointments are available for report generation."
        />
      ) : (
        <div>
          <h2 className="mb-5 font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Appointment Report
          </h2>

          <AdminTable
            headers={["Customer", "Service", "Date", "Status", "Amount"]}
          >
            {appointments.map((item) => {
              const matchedService = services.find(
                (service) => service.name === item.service
              );

              return (
                <tr
                  key={item.id}
                  className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
                >
                  <td className="py-4 font-medium text-darkText">
                    {item.customerName}
                  </td>

                  <td className="py-4 text-greyText">
                    {item.service}
                  </td>

                  <td className="py-4 text-greyText">
                    {item.date}
                  </td>

                  <td className="py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="py-4 font-semibold text-gold">
                    {matchedService?.price || "-"}
                  </td>
                </tr>
              );
            })}
          </AdminTable>
        </div>
      )}
    </div>
  );
};

export default AdminReports;