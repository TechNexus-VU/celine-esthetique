import AdminButton from "@/components/admin/AdminButton";

const ConfirmDeleteModal = ({
  isOpen,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[24px] border border-softPink bg-white p-7 shadow-[0_12px_35px_rgba(0,0,0,0.18)]">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-softPink text-2xl text-danger">
          !
        </div>

        <h2 className="font-heading text-2xl font-semibold text-darkText">
          {title}
        </h2>

        <p className="mt-3 font-body text-sm leading-6 text-greyText">
          {message}
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <AdminButton text="Cancel" variant="secondary" onClick={onCancel} />
          <AdminButton text="Delete" variant="danger" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;