const IntroSection = () => {
    return (
      <section className="w-full bg-white px-4 md:px-12 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto text-center">
          
          <p className="font-['Montserrat'] text-[14px] uppercase tracking-[3px] text-[#B76E79] mb-4">
            Welcome to Celine Esthétique
          </p>
  
          <h2 className="font-['Playfair_Display'] text-[30px] md:text-[36px] lg:text-[48px] leading-tight font-bold text-[#1A1A1A] mb-6">
            Celine Nail Salon & Aesthetic
            <br />
            Lausanne City Centre
          </h2>
  
          <p className="font-['Montserrat'] text-[14px] md:text-[16px] leading-7 text-[#9CA3AF] max-w-3xl mx-auto mb-8">
            Celine Esthétique offers luxury beauty, skincare, nails, and aesthetic
            treatments in the heart of Lausanne. Our goal is to provide elegant,
            relaxing, and professional services that enhance your natural beauty.
          </p>
  
          <button className="bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold hover:bg-[#C5A028] transition-all duration-300">
            DISCOVER MORE
          </button>
  
        </div>
      </section>
    );
  };
  
  export default IntroSection;