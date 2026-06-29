import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const CouponForm = ({ formData, editingId, onChange, onSubmit, onCancel }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
    >
      <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
        {editingId ? "Update Promotion" : "New Promotion"}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminInput
          name="code"
          type="text"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={onChange}
        />

        <AdminInput
          name="discount"
          type="number"
          placeholder="Discount %"
          value={formData.discount}
          onChange={onChange}
        />

        <AdminInput
          name="expiry"
          type="date"
          value={formData.expiry}
          onChange={onChange}
        />

        <AdminSelect name="status" value={formData.status} onChange={onChange}>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="disabled">Disabled</option>
        </AdminSelect>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <AdminButton
          type="submit"
          text={editingId ? "Update Coupon" : "Create Coupon"}
          variant="primary"
        />

        {editingId && (
          <AdminButton text="Cancel" variant="secondary" onClick={onCancel} />
        )}
      </div>
    </form>
  );
};

export default CouponForm;