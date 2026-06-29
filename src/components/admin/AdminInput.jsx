const AdminInput = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
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
        placeholder:text-greyText
        focus:border-primaryPink
        focus:ring-2
        focus:ring-primaryPink/20
      "
    />
  );
};

export default AdminInput;