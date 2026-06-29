import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={[
        "Image",
        "Product",
        "Category",
        "Price",
        "Stock",
        "Status",
        "Actions",
      ]}
    >
      {products.map((product) => (
        <tr
          key={product.id}
          className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
        >
          <td className="py-4">
            {product.imageURL ? (
              <img
                src={product.imageURL}
                alt={product.name}
                loading="lazy"
                className="h-14 w-14 rounded-[14px] object-cover"
              />
            ) : (
              <div className="h-14 w-14 rounded-[14px] bg-softPink" />
            )}
          </td>

          <td className="py-4 font-medium text-darkText">
            {product.name}
          </td>

          <td className="py-4 text-greyText">
            {product.category}
          </td>

          <td className="py-4">
            <span className="font-semibold text-gold">
              {product.price}
            </span>

            {product.oldPrice && (
              <span className="ml-2 text-sm text-greyText line-through">
                {product.oldPrice}
              </span>
            )}
          </td>

          <td className="py-4 text-greyText">
            {product.stock || "0"}
          </td>

          <td className="py-4">
            <StatusBadge status={product.status} />
          </td>

          <td className="flex flex-wrap gap-3 py-4">
            <AdminButton
              text="Edit"
              variant="secondary"
              onClick={() => onEdit(product)}
            />

            <AdminButton
              text="Delete"
              variant="danger"
              onClick={() => onDelete(product.id)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default ProductTable;