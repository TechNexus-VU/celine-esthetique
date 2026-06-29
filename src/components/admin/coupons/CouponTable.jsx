import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const CouponTable = ({ coupons, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={["Code", "Discount", "Expiry Date", "Status", "Actions"]}
    >
      {coupons.map((coupon) => (
        <tr
          key={coupon.id}
          className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
        >
          <td className="py-4 font-medium text-darkText">{coupon.code}</td>

          <td className="py-4 font-semibold text-gold">
            {coupon.discount}%
          </td>

          <td className="py-4 text-greyText">{coupon.expiry}</td>

          <td className="py-4">
            <StatusBadge status={coupon.status} />
          </td>

          <td className="flex flex-wrap gap-3 py-4">
            <AdminButton
              text="Edit"
              variant="secondary"
              onClick={() => onEdit(coupon)}
            />

            <AdminButton
              text="Delete"
              variant="danger"
              onClick={() => onDelete(coupon.id)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default CouponTable;