const AdminButton = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const styles = {
    primary:
      "bg-primaryPink text-white hover:bg-primaryPinkDark shadow-card",

    secondary:
      "border border-border bg-cardBg text-primaryPink hover:bg-hoverBg",

    success:
      "bg-gold text-darkText hover:brightness-95 shadow-soft",

    danger:
      "bg-danger text-white hover:opacity-90 shadow-soft",

    warning:
      "bg-hoverBg text-primaryPink hover:bg-softPink",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-button
        px-5 py-2.5
        font-body
        text-sm md:text-[15px]
        font-semibold
        focus:outline-none
        focus:ring-2
        focus:ring-primaryPink/30
        ${styles[variant] || styles.primary}
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer transition-all duration-300"
        }
      `}
    >
      {text}
    </button>
  );
};

export default AdminButton;