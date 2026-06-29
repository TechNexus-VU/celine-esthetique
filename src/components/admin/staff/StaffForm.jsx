import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const StaffForm = ({ formData, editingId, onChange, onSubmit, onCancel }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-5"
    >
      <AdminInput
        name="name"
        placeholder="Staff Name"
        value={formData.name}
        onChange={onChange}
      />

      <AdminInput
        name="role"
        placeholder="Role / Specialist"
        value={formData.role}
        onChange={onChange}
      />

      <AdminInput
        name="services"
        placeholder="Services Offered"
        value={formData.services}
        onChange={onChange}
      />

      <AdminInput
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={onChange}
      />

      <AdminSelect name="status" value={formData.status} onChange={onChange}>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
        <option value="inactive">Inactive</option>
      </AdminSelect>

      <div className="flex flex-wrap gap-3 lg:col-span-5">
        <AdminButton
          type="submit"
          text={editingId ? "Update Staff" : "Add Staff"}
          variant="primary"
        />

        {editingId && (
          <AdminButton text="Cancel" variant="secondary" onClick={onCancel} />
        )}
      </div>
    </form>
  );
};

export default StaffForm;