// Icons
import {
  FaUserCircle,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Components
import Navbar from "@/components/common/Navbar";

const Header = () => {
  return (
    <header className="w-full font-['Montserrat']">
      {/* TOP HEADER */}
      <div className="bg-white h-16 border-b border-[#F9E4E0]">
        <div className="w-full h-full px-4 md:px-12 lg:px-16 flex items-center justify-between">
          
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 text-[12px] md:text-[14px] font-medium text-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-[#D4AF37] text-[16px]" />
              <span>NUMBER (IDE REGISTER) CHE-250.076.012</span>
            </div>

            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-[#87A96B] text-[16px]" />
              <span>+41789494039</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-4 text-[14px] font-medium text-[#1A1A1A]">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">
              MY APPOINTMENT
            </span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">
              TRAININGS
            </span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">
              SHOP
            </span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">
              ONLINE GIFT VOUCHER
            </span>

            <div className="flex items-center gap-4">
              <FaFacebookF className="text-[#D4AF37]" />
              <FaInstagram className="text-[#1A1A1A]" />
              <FcGoogle />
            </div>
          </div>
        </div>
      </div>

      {/* GOLD ACCENT LINE */}
      <div className="h-2 bg-[#D4AF37]"></div>

      <Navbar />
    </header>
  );
};

export default Header;