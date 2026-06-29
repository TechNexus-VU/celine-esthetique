import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const AppointmentTable = ({ appointments, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={[
        "Customer",
        "Email",
        "Service",
        "Staff",
        "Date",
        "Time",
        "Status",
        "Actions",
      ]}
    >
      {appointments.map((item) => (
        <tr
          key={item.id}
          className="
            border-b border-border
            transition-colors duration-300
            hover:bg-hoverBg/40
            last:border-none
          "
        >
          {/* Customer */}
          <td className="py-4 text-sm font-medium text-darkText md:text-[15px]">
            {item.customerName}
          </td>

          {/* Email */}
          <td className="py-4 text-sm text-greyText md:text-[15px]">
            {item.email}
          </td>

          {/* Service */}
          <td className="py-4 text-sm text-greyText md:text-[15px]">
            {item.service}
          </td>

          {/* Staff */}
          <td className="py-4 text-sm text-greyText md:text-[15px]">
            {item.staff || "-"}
          </td>

          {/* Date */}
          <td className="py-4 text-sm text-greyText md:text-[15px]">
            {item.date}
          </td>

          {/* Time */}
          <td className="py-4 text-sm text-greyText md:text-[15px]">
            {item.time}
          </td>

          {/* Status */}
          <td className="py-4">
            <StatusBadge status={item.status} />
          </td>

          {/* Actions */}
          <td className="py-4">
            <div className="flex flex-wrap gap-2">
              <AdminButton
                text="Edit"
                variant="secondary"
                onClick={() => onEdit(item)}
              />

              <AdminButton
                text="Delete"
                variant="danger"
                onClick={() => onDelete(item.id)}
              />
            </div>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default AppointmentTable;