import heroImage from "@/assets/hero.png";

const Hero = () => {
  return (
    <section className="w-full bg-[#F9E4E0]">
      <div className="px-8 md:px-12 lg:px-16 py-8">
        <div className="min-h-[500px] grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* LEFT CONTENT */}
          <div className="max-w-[620px]">
            <p className="font-['Montserrat'] text-[14px] tracking-[4px] uppercase text-[#B76E79] mb-4">
              Luxury Beauty Salon
            </p>

            <h1 className="font-['Playfair_Display'] text-[36px] md:text-[48px] lg:text-[56px] leading-[1.08] font-bold text-[#1A1A1A]">
              Celine Esthétique
              <br />
              City Centre{" "}
              <span className="text-[#D4AF37]">Lausanne</span>
            </h1>

            <p className="font-['Montserrat'] text-[16px] leading-7 text-[#9CA3AF] mt-6 max-w-[560px]">
              Experience premium beauty, skincare, nails, and aesthetic
              treatments designed to enhance your natural elegance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold hover:bg-[#C5A028] transition">
                MAKE APPOINTMENT
              </button>

              <button className="border border-[#1A1A1A] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold hover:bg-[#1A1A1A] hover:text-white transition">
                VIEW SERVICES
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px]">
              <div className="absolute -top-8 -right-8 w-[260px] h-[260px] rounded-full border border-[#D4AF37]/50"></div>

              <img
                src={heroImage}
                alt="Celine Esthétique"
                className="relative z-10 w-full h-[340px] object-cover object-[65%_center] rounded-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;