import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-[96px] bg-[#B76E79]">
      <div className="w-full h-full flex justify-between items-center px-4 md:px-12 lg:px-16">

        {/* Logo */}
        <h1 className="font-['Playfair_Display'] text-[30px] md:text-[36px] font-bold text-white">
          Celine Esthétique
        </h1>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-12 font-[Montserrat] text-[14px] font-medium text-white">

          <li>
            <Link to="/" className="hover:text-[#D4AF37] transition-colors">
              HOME
            </Link>
          </li>

          <li>
            <Link to="/services" className="hover:text-[#D4AF37] transition-colors">
              SERVICES
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
              ABOUT
            </Link>
          </li>

          <li>
            <Link to="/gallery" className="hover:text-[#D4AF37] transition-colors">
              GALLERY
            </Link>
          </li>

          {/* Add Blog */}
          <li>
            <Link to="/blog" className="hover:text-[#D4AF37] transition-colors">
              BLOG
            </Link>
          </li>

          {/* Add Shop */}
          <li>
            <Link to="/shop" className="hover:text-[#D4AF37] transition-colors">
              SHOP
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Button */}
        <button
          className="
            hidden md:block
            bg-[#D4AF37]
            text-black
            px-8
            py-3
            rounded-full
            font-['Montserrat']
            text-sm
            tracking-wider
            font-semibold
            shadow-md
            hover:scale-105
            hover:bg-[#C5A028]
            transition-all
            duration-300
          "
        >
          BOOK NOW
        </button>
      </div>
    </nav>
  );
};

export default Navbar;