const AdminPageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-darkText md:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 font-body text-sm text-greyText md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default AdminPageHeader;