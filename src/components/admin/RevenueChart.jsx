import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 400 },
  { day: "Tue", revenue: 700 },
  { day: "Wed", revenue: 550 },
  { day: "Thu", revenue: 900 },
  { day: "Fri", revenue: 650 },
  { day: "Sat", revenue: 1000 },
];

const RevenueChart = () => {
  return (
    <section className="flex h-full min-h-[430px] w-full flex-col rounded-card border border-border bg-cardBg p-5 shadow-card">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 h-[3px] w-12 rounded-full bg-primaryPink" />

          <h2 className="font-heading text-xl font-semibold text-darkText md:text-2xl">
            Weekly Revenue
          </h2>

          <p className="mt-1 max-w-[260px] font-body text-xs text-greyText md:text-sm">
            Revenue generated from salon bookings.
          </p>
        </div>

        <select className="w-full rounded-button border border-border bg-pageBg px-3 py-2 font-body text-xs text-darkText outline-none focus:border-primaryPink focus:ring-2 focus:ring-primaryPink/20 sm:w-auto">
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-button border border-border bg-hoverBg/50 p-4">
          <p className="font-body text-xs text-greyText">Total Revenue</p>
          <h3 className="mt-1 font-heading text-2xl text-primaryPink">
            $4,200
          </h3>
        </div>

        <div className="rounded-button border border-border bg-[#EEF9F1] p-4">
          <p className="font-body text-xs text-greyText">Growth</p>
          <h3 className="mt-1 font-body text-lg font-semibold text-success">
            +12.4%
          </h3>
        </div>
      </div>

      <div className="mt-auto h-[170px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueData}
            margin={{ top: 10, right: 4, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#737373" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="revenue"
              radius={[10, 10, 0, 0]}
              fill="#C94F7C"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RevenueChart;