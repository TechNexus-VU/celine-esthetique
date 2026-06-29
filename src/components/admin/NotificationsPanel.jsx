import { Bell, CalendarCheck, CreditCard, Star } from "lucide-react";

const notifications = [
  {
    title: "New appointment request",
    time: "10 mins ago",
    type: "appointment",
  },
  {
    title: "Payment received from Sophie",
    time: "25 mins ago",
    type: "payment",
  },
  {
    title: "Review waiting for approval",
    time: "1 hour ago",
    type: "review",
  },
];

const iconMap = {
  appointment: CalendarCheck,
  payment: CreditCard,
  review: Star,
};

const NotificationsPanel = () => {
  return (
    <section className="rounded-card border border-border bg-cardBg p-5 shadow-card md:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="mb-3 h-[3px] w-12 rounded-full bg-primaryPink" />

          <h2 className="font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Notifications
          </h2>

          <p className="mt-1 font-body text-sm text-greyText">
            Recent salon updates and alerts.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-hoverBg px-3 py-1 text-xs font-semibold text-primaryPink">
          3 New
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((item, index) => {
          const Icon = iconMap[item.type] || Bell;

          return (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-button border border-border bg-cardBg p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-hoverBg/40 hover:shadow-soft"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hoverBg text-primaryPink transition group-hover:bg-primaryPink group-hover:text-white">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-semibold text-darkText md:text-base">
                  {item.title}
                </p>

                <p className="mt-1 font-body text-xs text-greyText">
                  {item.time}
                </p>
              </div>

              <span className="mt-2 h-2 w-2 rounded-full bg-gold" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NotificationsPanel;