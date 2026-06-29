import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const ReviewTable = ({ reviews, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={["Client", "Service", "Rating", "Comment", "Status", "Actions"]}
    >
      {reviews.map((review) => (
        <tr
          key={review.id}
          className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
        >
          <td className="py-4 font-medium text-darkText">{review.client}</td>
          <td className="py-4 text-greyText">{review.service}</td>

          <td className="py-4 font-semibold text-gold">
            {"★".repeat(Number(review.rating))}
          </td>

          <td className="max-w-[320px] py-4 text-greyText">
            {review.comment}
          </td>

          <td className="py-4">
            <StatusBadge status={review.status} />
          </td>

          <td className="flex flex-wrap gap-3 py-4">
            <AdminButton
              text="Edit"
              variant="secondary"
              onClick={() => onEdit(review)}
            />

            <AdminButton
              text="Delete"
              variant="danger"
              onClick={() => onDelete(review.id)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default ReviewTable;