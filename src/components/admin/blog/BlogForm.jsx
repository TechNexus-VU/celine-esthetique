import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const BlogForm = ({
  formData,
  editingId,
  onChange,
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
        placeholder="Blog Title"
        value={formData.title}
        onChange={onChange}
      />

      <AdminInput
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={onChange}
      />

      <AdminInput
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={onChange}
      />

      <AdminSelect
        name="status"
        value={formData.status}
        onChange={onChange}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </AdminSelect>

      <textarea
        name="content"
        placeholder="Blog Content"
        value={formData.content}
        onChange={onChange}
        rows="4"
        className="w-full rounded-[14px] border border-softPink bg-white px-4 py-3 md:col-span-2 lg:col-span-4"
      />

      <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
        <AdminButton
          type="submit"
          text={editingId ? "Update Blog" : "Add Blog"}
          variant="primary"
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

export default BlogForm;