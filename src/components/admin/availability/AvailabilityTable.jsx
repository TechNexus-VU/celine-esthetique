import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const AvailabilityTable = ({ availabilityList, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={["Day", "Start Time", "End Time", "Status", "Note", "Actions"]}
    >
      {availabilityList.map((item) => (
        <tr
          key={item.id}
          className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
        >
          <td className="py-4 font-medium text-darkText">{item.day}</td>
          <td className="py-4 text-greyText">{item.startTime}</td>
          <td className="py-4 text-greyText">{item.endTime}</td>

          <td className="py-4">
            <StatusBadge status={item.status} />
          </td>

          <td className="py-4 text-greyText">{item.note || "-"}</td>

          <td className="flex flex-wrap gap-3 py-4">
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
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default AvailabilityTable;