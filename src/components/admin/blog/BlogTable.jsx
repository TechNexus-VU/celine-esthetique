import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={["Title", "Category", "Author", "Status", "Actions"]}
    >
      {blogs.map((blog) => (
        <tr
          key={blog.id}
          className="border-b border-softPink hover:bg-softPink/30"
        >
          <td className="py-4 font-medium text-darkText">
            {blog.title}
          </td>

          <td className="py-4 text-greyText">
            {blog.category}
          </td>

          <td className="py-4 text-greyText">
            {blog.author || "Admin"}
          </td>

          <td className="py-4">
            <StatusBadge status={blog.status} />
          </td>

          <td className="flex flex-wrap gap-3 py-4">
            <AdminButton
              text="Edit"
              variant="secondary"
              onClick={() => onEdit(blog)}
            />

            <AdminButton
              text="Delete"
              variant="danger"
              onClick={() => onDelete(blog.id)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default BlogTable;