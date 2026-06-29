import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const StaffTable = ({ staffList, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={["Name", "Role", "Services", "Phone", "Status", "Actions"]}
    >
      {staffList.map((staff) => (
        <tr
          key={staff.id}
          className="border-b border-softPink hover:bg-softPink/30 last:border-none"
        >
          <td className="py-4 font-medium text-darkText">{staff.name}</td>
          <td className="py-4 text-greyText">{staff.role}</td>
          <td className="py-4 text-greyText">{staff.services}</td>
          <td className="py-4 text-greyText">{staff.phone || "-"}</td>

          <td className="py-4">
            <StatusBadge status={staff.status} />
          </td>

          <td className="flex flex-wrap gap-3 py-4">
            <AdminButton
              text="Edit"
              variant="secondary"
              onClick={() => onEdit(staff)}
            />

            <AdminButton
              text="Delete"
              variant="danger"
              onClick={() => onDelete(staff.id)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default StaffTable;