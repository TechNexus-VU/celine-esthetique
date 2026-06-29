import { Clock3, CalendarDays } from "lucide-react";

const bookings = [
  {
    time: "09:00",
    client: "Sophie Martin",
    service: "Manicure",
    status: "Confirmed",
  },
  {
    time: "11:30",
    client: "Emma Laurent",
    service: "Eyelash Lift",
    status: "Pending",
  },
  {
    time: "14:00",
    client: "Amina Khan",
    service: "Head Spa",
    status: "Confirmed",
  },
];

const CalendarView = () => {
  return (
    <section className="rounded-card border border-border bg-cardBg p-5 shadow-card md:p-6">
      
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="mb-3 h-[3px] w-12 rounded-full bg-primaryPink" />

          <h2 className="font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Today’s Schedule
          </h2>

          <p className="mt-1 font-body text-sm text-greyText">
            Tuesday, 29 June • Salon bookings
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-hoverBg text-primaryPink">
          <CalendarDays size={18} />
        </div>
      </div>

      {/* BOOKINGS */}
      <div className="space-y-3">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col gap-4
              rounded-button
              border border-border
              bg-cardBg
              p-4
              transition-all duration-300
              hover:bg-hoverBg/40
              hover:shadow-soft
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF8E6] text-gold">
                <Clock3 size={18} />
              </div>

              <div>
                <p className="font-body text-sm font-semibold text-darkText md:text-base">
                  {item.client}
                </p>

                <p className="mt-1 text-xs text-greyText">
                  {item.service}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <span className="font-body text-sm font-semibold text-primaryPink">
                {item.time}
              </span>

              <span
                className={`
                  rounded-full px-3 py-1 text-xs font-semibold
                  ${
                    item.status === "Confirmed"
                      ? "bg-[#EEF9F1] text-success"
                      : "bg-[#FFF8E6] text-gold"
                  }
                `}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CalendarView;