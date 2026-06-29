import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Scissors,
  Users,
  Star,
  Newspaper,
  ShoppingBag,
  TicketPercent,
  BarChart3,
  Settings,
  CreditCard,
  Headphones,
  X,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Appointments", path: "/admin/appointments", icon: ClipboardList },
  { name: "Services", path: "/admin/services", icon: Scissors },
  { name: "Staff", path: "/admin/staff", icon: Users },
  { name: "Clients", path: "/admin/users", icon: Users },
  { name: "Payments", path: "/admin/payments", icon: CreditCard },
  { name: "Reviews", path: "/admin/reviews", icon: Star },
  { name: "Products", path: "/admin/products", icon: ShoppingBag },
  { name: "Coupons", path: "/admin/coupons", icon: TicketPercent },
  { name: "Blog", path: "/admin/blog", icon: Newspaper },
  { name: "Reports", path: "/admin/reports", icon: BarChart3 },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

const SidebarContent = ({ closeSidebar }) => {
  return (
    <>
      <div className="mb-8 px-4">
        <h2 className="font-heading text-4xl font-semibold italic text-primaryPink">
          Celine
        </h2>
        <p className="mt-1 font-body text-[11px] uppercase tracking-[5px] text-darkText">
          Esthétique
        </p>
      </div>

      <nav className="flex-1 space-y-1.5  font-body text-sm">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-button px-4 py-3 font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-primaryPink text-white shadow-card"
                    : "text-darkText hover:bg-hoverBg hover:text-primaryPink"
                }`
              }
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-6 rounded-button border border-border bg-cardBg p-3 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primaryPink font-semibold text-white">
            M
          </div>

          <div className="min-w-0">
            <p className="truncate font-body text-sm font-semibold text-darkText">
              Mehwish Mughal
            </p>
            <p className="font-body text-xs text-greyText">Administrator</p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-button border border-border bg-cardBg p-4 shadow-soft">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-hoverBg text-primaryPink">
          <Headphones size={18} />
        </div>

        <p className="font-body text-sm font-semibold text-darkText">
          Need Help?
        </p>
        <p className="mt-1 font-body text-xs leading-5 text-greyText">
          Contact support for assistance.
        </p>

        <button className="mt-4 w-full rounded-button bg-primaryPink px-4 py-2.5 font-body text-xs font-semibold text-white transition hover:bg-primaryPinkDark">
          Contact Support
        </button>
      </div>
    </>
  );
};

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <aside className="hidden min-h-screen w-[260px] shrink-0 border-r border-border bg-sidebarBg px-5 py-7 shadow-card lg:sticky lg:top-0 lg:flex lg:flex-col xl:w-[280px]">
        <SidebarContent />
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[60] flex h-screen w-[82%] max-w-[320px] flex-col border-r border-border bg-sidebarBg px-5 py-7 shadow-card transition-transform duration-300 lg:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-hoverBg text-primaryPink"
          aria-label="Close sidebar"
          type="button"
        >
          <X size={18} />
        </button>

        <SidebarContent closeSidebar={onClose} />
      </aside>
    </>
  );
};

export default AdminSidebar;