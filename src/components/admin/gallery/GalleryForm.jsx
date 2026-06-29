import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const GalleryForm = ({
  formData,
  editingId,
  saving,
  onChange,
  onImageChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
    >
      <AdminInput
        name="title"
        placeholder="Image Title"
        value={formData.title}
        onChange={onChange}
      />

      <AdminInput
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={onChange}
      />

      <AdminSelect
        name="status"
        value={formData.status}
        onChange={onChange}
      >
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </AdminSelect>

      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="w-full rounded-[14px] border border-softPink bg-white px-4 py-3"
      />

      <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
        <AdminButton
          type="submit"
          text={
            saving
              ? "Saving..."
              : editingId
              ? "Update Image"
              : "Upload Image"
          }
          variant="primary"
          disabled={saving}
        />

        {editingId && (
          <AdminButton
            text="Cancel"
            variant="secondary"
            onClick={onCancel}
          />
        )}
      </div>
    </form>
  );
};

export default GalleryForm;