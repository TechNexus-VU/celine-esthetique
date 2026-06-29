const StatsCard = ({ title, value, icon, trend, variant = "pink" }) => {
  const variants = {
    pink: {
      valueColor: "text-primaryPink",
      iconBg: "bg-hoverBg",
      iconColor: "text-primaryPink",
    },
    gold: {
      valueColor: "text-gold",
      iconBg: "bg-[#FFF8E6]",
      iconColor: "text-gold",
    },
    success: {
      valueColor: "text-success",
      iconBg: "bg-[#EEF9F1]",
      iconColor: "text-success",
    },
  };

  const current = variants[variant] || variants.pink;

  return (
    <div
      className="
        group
        rounded-card
        border border-border
        bg-cardBg
        p-6
        shadow-soft
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-card
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-sm font-medium text-greyText">
            {title}
          </p>

          {/* Accent line */}
          <div className="mt-3 h-[3px] w-10 rounded-full bg-primaryPink"></div>
        </div>

        {icon && (
          <div
            className={`
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-full
              transition-all duration-300
              ${current.iconBg}
              ${current.iconColor}
            `}
          >
            {icon}
          </div>
        )}
      </div>

      <h2
        className={`mt-5 font-heading text-3xl font-semibold md:text-4xl ${current.valueColor}`}
      >
        {value}
      </h2>

      {trend && (
        <p className="mt-3 font-body text-xs font-medium text-success">
          {trend}
        </p>
      )}
    </div>
  );
};

export default StatsCard;