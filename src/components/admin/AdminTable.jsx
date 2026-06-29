const AdminTable = ({ headers, children }) => {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-card border border-border bg-cardBg shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse font-body text-sm">
          <thead className="bg-hoverBg/60">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[1.5px] text-greyText"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;