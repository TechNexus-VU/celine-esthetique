import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/firebase/auth";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const AdminTopbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      showSuccess("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      showError("Failed to logout.");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-cardBg shadow-soft">
      <div className="flex h-[72px] items-center justify-between px-4 md:h-[80px] md:px-6 lg:h-[86px] lg:px-8">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">
        <button
  onClick={onMenuClick}
  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-darkText transition hover:bg-hoverBg lg:hidden"
  type="button"
>
  <Menu size={22} />
</button>

          {/* DESKTOP SEARCH */}
          <div className="hidden h-12 w-[300px] items-center gap-3 rounded-button border border-border bg-pageBg px-4 lg:flex xl:w-[380px]">
            <Search size={18} className="shrink-0 text-greyText" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent font-body text-sm text-darkText outline-none placeholder:text-greyText"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center gap-2 sm:gap-3 lg:gap-5">
          {/* MOBILE SEARCH */}
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-hoverBg lg:hidden"
            type="button"
          >
            {showMobileSearch ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* NOTIFICATION */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-hoverBg md:h-11 md:w-11"
              type="button"
            >
              <Bell size={19} />

              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primaryPink text-[10px] font-bold text-white">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-[280px] rounded-card border border-border bg-cardBg p-4 shadow-card">
                <p className="font-body text-sm font-semibold text-darkText">
                  Notifications
                </p>

                <div className="mt-3 space-y-3">
                  <p className="rounded-button bg-hoverBg p-3 text-xs text-greyText">
                    New appointment request received.
                  </p>
                  <p className="rounded-button bg-hoverBg p-3 text-xs text-greyText">
                    Payment completed successfully.
                  </p>
                  <p className="rounded-button bg-hoverBg p-3 text-xs text-greyText">
                    New client registered today.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CALENDAR */}
          <button
            onClick={() => navigate("/admin/appointments")}
            className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-hoverBg sm:flex md:h-11 md:w-11"
            type="button"
            title="Appointments"
          >
            <CalendarDays size={19} />
          </button>

          {/* PROFILE */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primaryPink font-body text-sm font-semibold text-white md:h-11 md:w-11">
              M
            </div>

            <div className="hidden xl:block">
              <p className="font-body text-sm font-semibold text-darkText">
                Mehwish
              </p>
              <p className="font-body text-xs text-greyText">Admin</p>
            </div>

            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="hidden rounded-full p-2 transition hover:bg-hoverBg md:block"
              type="button"
              title="Profile menu"
            >
              <ChevronDown size={18} />
            </button>

            <button
              onClick={handleLogout}
              className="rounded-full p-2 transition hover:bg-hoverBg md:hidden"
              type="button"
              title="Logout"
            >
              <LogOut size={18} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-[190px] rounded-card border border-border bg-cardBg p-2 shadow-card">
                <button
                  onClick={() => navigate("/admin/settings")}
                  className="w-full rounded-button px-3 py-2 text-left font-body text-sm text-darkText hover:bg-hoverBg"
                  type="button"
                >
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-2 rounded-button px-3 py-2 text-left font-body text-sm text-danger hover:bg-hoverBg"
                  type="button"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {showMobileSearch && (
        <div className="border-t border-border bg-cardBg px-4 py-3 lg:hidden">
          <div className="flex h-11 items-center gap-3 rounded-button border border-border bg-pageBg px-4">
            <Search size={17} className="text-greyText" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent font-body text-sm text-darkText outline-none placeholder:text-greyText"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminTopbar;