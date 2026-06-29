const AdminSelect = ({
  name,
  value,
  onChange,
  children,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-button
        border border-border
        bg-cardBg
        px-4 py-3
        font-body
        text-sm md:text-[15px]
        text-darkText
        outline-none
        transition-all duration-300
        cursor-pointer
        focus:border-primaryPink
        focus:ring-2
        focus:ring-primaryPink/20
      "
    >
      {children}
    </select>
  );
};

export default AdminSelect;