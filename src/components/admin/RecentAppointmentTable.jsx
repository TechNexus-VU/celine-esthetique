import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const appointments = [
  {
    client: "Sophie Martin",
    service: "Manicure",
    date: "Today",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    client: "Emma Laurent",
    service: "Eyelash Lift",
    date: "Today",
    time: "12:00 PM",
    status: "Pending",
  },
  {
    client: "Amina Khan",
    service: "Head Spa",
    date: "Tomorrow",
    time: "03:00 PM",
    status: "Confirmed",
  },
];

const RecentAppointmentTable = () => {
  return (
    <section className="flex h-full min-h-[340px] flex-col rounded-card border border-border bg-cardBg p-5 shadow-card">
      
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 h-[3px] w-12 rounded-full bg-primaryPink"></div>

          <h2 className="font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Recent Appointments
          </h2>

          <p className="mt-1 font-body text-sm text-greyText">
            Latest client bookings and appointment status.
          </p>
        </div>

        <button className="w-full rounded-button bg-primaryPink px-5 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-primaryPinkDark sm:w-auto shadow-soft">
          View All
        </button>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-x-auto">
        <AdminTable
          headers={["Client", "Service", "Date", "Time", "Status"]}
        >
          {appointments.map((item, index) => (
            <tr
              key={index}
              className="border-b border-border transition-colors duration-300 hover:bg-hoverBg/40 last:border-none"
            >
              {/* CLIENT WITH AVATAR */}
              <td className="whitespace-nowrap px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-hoverBg text-xs font-semibold text-primaryPink">
                    {item.client
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <span className="font-medium text-darkText">
                    {item.client}
                  </span>
                </div>
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-greyText">
                {item.service}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-greyText">
                {item.date}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-greyText">
                {item.time}
              </td>

              <td className="whitespace-nowrap px-4 py-4">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </section>
  );
};

export default RecentAppointmentTable;