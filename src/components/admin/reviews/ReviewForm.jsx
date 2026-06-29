import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const ReviewForm = ({ formData, editingId, onChange, onSubmit, onCancel }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
    >
      <AdminInput
        name="client"
        placeholder="Client Name"
        value={formData.client}
        onChange={onChange}
      />

      <AdminInput
        name="service"
        placeholder="Service"
        value={formData.service}
        onChange={onChange}
      />

      <AdminSelect name="rating" value={formData.rating} onChange={onChange}>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </AdminSelect>

      <AdminSelect name="status" value={formData.status} onChange={onChange}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </AdminSelect>

      <textarea
        name="comment"
        placeholder="Review Comment"
        value={formData.comment}
        onChange={onChange}
        rows="3"
        className="w-full rounded-[14px] border border-softPink bg-white px-4 py-3 font-body text-darkText outline-none transition-all duration-300 focus:border-primaryPink focus:ring-2 focus:ring-softPink md:col-span-2 lg:col-span-4"
      />

      <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
        <AdminButton
          type="submit"
          text={editingId ? "Update Review" : "Add Review"}
          variant="primary"
        />

        {editingId && (
          <AdminButton text="Cancel" variant="secondary" onClick={onCancel} />
        )}
      </div>
    </form>
  );
};

export default ReviewForm;