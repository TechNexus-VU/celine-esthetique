import AdminButton from "@/components/admin/AdminButton";
import StatusBadge from "@/components/admin/StatusBadge";

const GalleryGrid = ({ galleryItems, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {galleryItems.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-[24px] border border-softPink bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
        >
          <img
            src={item.imageURL}
            alt={item.title}
            className="h-[220px] w-full object-cover"
          />

          <div className="p-5">
            <h2 className="font-heading text-2xl font-semibold text-darkText">
              {item.title}
            </h2>

            <p className="mt-2 text-sm text-greyText">
              {item.category}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <StatusBadge status={item.status} />

              <div className="flex flex-wrap gap-3">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => onEdit(item)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => onDelete(item)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;