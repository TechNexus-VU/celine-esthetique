import { useState } from "react";
import {
  CalendarCheck,
  DollarSign,
  Users,
  UserRound,
  CalendarDays,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatsCard from "@/components/admin/StatsCard";
import RecentAppointmentTable from "@/components/admin/RecentAppointmentTable";
import RevenueChart from "@/components/admin/RevenueChart";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import CalendarView from "@/components/admin/CalendarView";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="admin-page flex min-h-screen">
      <AdminSidebar 
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    />
      <main className="min-w-0 flex-1 bg-pageBg">
    <AdminTopbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="mx-auto w-full max-w-[1480px] px-4 py-5 pt-20 sm:px-5 md:px-6 lg:px-8 lg:pt-6 xl:px-10">
          <AdminPageHeader
            title="Welcome back, Mehwish 👋"
            subtitle="Here’s what’s happening with your salon today."
            actions={
              <div className="flex w-full items-center gap-2 rounded-button border border-border bg-cardBg px-4 py-2.5 font-body text-xs font-semibold text-darkText shadow-soft sm:w-auto sm:text-sm">
                <CalendarDays size={17} className="shrink-0 text-primaryPink" />
                <span className="truncate">Tuesday, 29 June 2025</span>
              </div>
            }
          />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Today’s Appointments"
              value="24"
              icon={<CalendarCheck size={22} />}
              trend="+12% from yesterday"
              variant="pink"
            />

            <StatsCard
              title="Revenue"
              value="$4,500"
              icon={<DollarSign size={22} />}
              trend="+18% from yesterday"
              variant="gold"
            />

            <StatsCard
              title="Clients"
              value="85"
              icon={<Users size={22} />}
              trend="+9% from last week"
              variant="pink"
            />

            <StatsCard
              title="Staff Members"
              value="6"
              icon={<UserRound size={22} />}
              trend="No change"
              variant="pink"
            />
          </section>

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-stretch">
            <div className="min-w-0 xl:h-full">
              <RecentAppointmentTable />
            </div>

            <div className="min-w-0 xl:h-full">
              <RevenueChart />
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <NotificationsPanel />
            <CalendarView />
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;