const StatusBadge = ({ status }) => {
  const styles = {
    /* PINK FAMILY */
    confirmed: "bg-hoverBg text-primaryPink",
    published: "bg-hoverBg text-primaryPink",
    holiday: "bg-hoverBg text-primaryPink",

    /* GOLD FAMILY */
    pending: "bg-[#FFF8E6] text-gold",
    break: "bg-[#FFF8E6] text-gold",
    scheduled: "bg-[#FFF8E6] text-gold",

    /* GREEN FAMILY */
    completed: "bg-[#EEF9F1] text-success",
    active: "bg-[#EEF9F1] text-success",
    approved: "bg-[#EEF9F1] text-success",
    open: "bg-[#EEF9F1] text-success",
    sent: "bg-[#EEF9F1] text-success",

    /* RED FAMILY */
    cancelled: "bg-[#FFF1F2] text-danger",
    blocked: "bg-[#FFF1F2] text-danger",
    rejected: "bg-[#FFF1F2] text-danger",
    closed: "bg-[#FFF1F2] text-danger",
    expired: "bg-[#FFF1F2] text-danger",

    /* NEUTRAL */
    draft: "bg-[#F8F8F8] text-greyText",
    disabled: "bg-[#F8F8F8] text-greyText",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full
        px-4 py-2
        min-w-[90px]
        font-body
        text-xs
        font-medium
        capitalize
        ${styles[status?.toLowerCase()] || "bg-[#F8F8F8] text-greyText"}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;