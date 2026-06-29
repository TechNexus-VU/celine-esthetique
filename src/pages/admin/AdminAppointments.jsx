import { useState } from "react";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customer: "Mehwish",
      email: "mehwishmughal16tl27@gmail.com",
      service: "Pedicure",
      staff: "Pedicure Services",
      date: "2026-06-29",
      time: "17:42",
      status: "Confirmed",
    },
  ]);

  return (
    <section className="min-h-screen bg-[#F9E4E0] px-4 py-8 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-[#1A1A1A] sm:text-5xl">
          Appointment Management
        </h1>
        <p className="mt-3 text-base text-[#6B7280] sm:text-lg">
          Create, update, and manage salon appointments.
        </p>
      </div>

      {/* Form Card */}
      <div className="mb-10 rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-7 lg:p-8">
        <form className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <input
            type="text"
            placeholder="Customer Name"
            className="input-style"
          />

          <input
            type="email"
            placeholder="Customer Email"
            className="input-style"
          />

          <input type="text" placeholder="Service" className="input-style" />

          <input type="text" placeholder="Staff" className="input-style" />

          <input type="date" className="input-style" />

          <input type="time" className="input-style" />

          <select className="input-style">
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>

          <div className="flex items-center">
            <button
              type="button"
              className="w-full rounded-full bg-[#D4AF37] px-7 py-4 text-sm font-bold text-[#1A1A1A] shadow-[0_8px_18px_rgba(212,175,55,0.35)] transition hover:bg-[#C5A028] sm:w-auto"
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#FAF6F2]">
              <tr>
                {[
                  "Customer",
                  "Email",
                  "Service",
                  "Staff",
                  "Date",
                  "Time",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-5 text-xs font-bold uppercase tracking-[3px] text-[#6B7280]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#F3E4E8] transition hover:bg-[#FFF8F2]"
                >
                  <td className="px-6 py-6 font-semibold text-[#1A1A1A]">
                    {item.customer}
                  </td>

                  <td className="px-6 py-6 text-[#6B7280]">{item.email}</td>

                  <td className="px-6 py-6 text-[#6B7280]">{item.service}</td>

                  <td className="px-6 py-6 text-[#6B7280]">{item.staff}</td>

                  <td className="px-6 py-6 text-[#6B7280]">{item.date}</td>

                  <td className="px-6 py-6 text-[#6B7280]">{item.time}</td>

                  <td className="px-6 py-6">
                    <span
                      className={`rounded-full px-5 py-2 text-sm font-semibold ${
                        item.status === "Confirmed"
                          ? "bg-[#EAF7EE] text-[#2D6A4F]"
                          : item.status === "Cancelled"
                          ? "bg-[#FDECEC] text-[#800020]"
                          : "bg-[#FFF3CD] text-[#9A6A00]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex gap-3">
                      <button className="rounded-full border border-[#D4AF37] px-6 py-3 text-sm font-bold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#1A1A1A]">
                        Edit
                      </button>

                      <button className="rounded-full bg-[#800020] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#650018]">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AppointmentManagement;