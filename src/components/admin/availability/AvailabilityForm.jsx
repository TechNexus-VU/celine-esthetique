import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const AvailabilityForm = ({
  formData,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-5"
    >
      <AdminSelect name="day" value={formData.day} onChange={onChange}>
        <option value="">Select Day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </AdminSelect>

      <AdminInput
        name="startTime"
        type="time"
        value={formData.startTime}
        onChange={onChange}
      />

      <AdminInput
        name="endTime"
        type="time"
        value={formData.endTime}
        onChange={onChange}
      />

      <AdminSelect name="status" value={formData.status} onChange={onChange}>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="break">Break</option>
        <option value="holiday">Holiday</option>
      </AdminSelect>

      <AdminInput
        name="note"
        placeholder="Note"
        value={formData.note}
        onChange={onChange}
      />

      <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-5">
        <AdminButton
          type="submit"
          text={editingId ? "Update Availability" : "Add Availability"}
          variant="primary"
        />

        {editingId && (
          <AdminButton text="Cancel" variant="secondary" onClick={onCancel} />
        )}
      </div>
    </form>
  );
};

export default AvailabilityForm;