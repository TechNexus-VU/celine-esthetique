
const EmptyState = ({
  title = "No Data Found",
  message = "There is nothing to display right now.",
}) => {
  return (
    <div className="flex min-h-[350px] items-center justify-center">
      <div
        className="
          w-full max-w-md
          rounded-[24px]
          bg-white
          p-10
          text-center
          shadow-[0_8px_20px_rgba(0,0,0,0.08)]
          border border-softPink
        "
      >
        {/* Elegant Icon */}
        <div className="mb-5 text-5xl text-primaryPink">
          ✨
        </div>

        {/* Title */}
        <h2
          className="
            font-heading
            text-2xl
            font-semibold
            text-darkText
          "
        >
          {title}
        </h2>

        {/* Message */}
        <p
          className="
            mt-3
            font-body
            text-sm
            leading-6
            text-greyText
          "
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;