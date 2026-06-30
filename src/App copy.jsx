import { useState, useEffect, useRef } from "react";

/* ─── Design Tokens ─────────────────────────────────────────────── */
const C = {
  pink: "#e91e8c",
  pinkLight: "#f8e1f0",
  pinkMid: "#f3a8d3",
  pinkDark: "#c2185b",
  gold: "#c9a84c",
  black: "#111",
  gray: "#666",
  lightGray: "#f7f7f7",
  white: "#fff",
  beige: "#fdf6f0",
};

/* ─── Google Fonts ──────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Global Styles ─────────────────────────────────────────────── */
const styleEl = document.createElement("style");
styleEl.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; color: #333; overflow-x: hidden; }
  .script { font-family: 'Dancing Script', cursive; }
  .serif { font-family: 'Playfair Display', serif; }

  .btn-pink {
    background: ${C.pink};
    color: #fff;
    border: none;
    padding: 12px 28px;
    border-radius: 30px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.5px;
  }
  .btn-pink:hover { background: ${C.pinkDark}; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(233,30,140,0.35); }

  .btn-outline {
    background: transparent;
    color: ${C.pink};
    border: 2px solid ${C.pink};
    padding: 10px 26px;
    border-radius: 30px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btn-outline:hover { background: ${C.pink}; color: #fff; }

  .section-label {
    font-family: 'Dancing Script', cursive;
    color: ${C.pink};
    font-size: 22px;
    display: block;
    margin-bottom: 4px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 4vw, 42px);
    color: #111;
    line-height: 1.2;
  }
  .section-title span {
    font-family: 'Dancing Script', cursive;
    color: ${C.pink};
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(233,30,140,0.4); }
    70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(233,30,140,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(233,30,140,0); }
  }
  .fade-up { animation: fadeInUp 0.7s ease forwards; }
  .float-anim { animation: float 3s ease-in-out infinite; }

  /* Navbar */
  .nav-link {
    color: #333;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    padding: 6px 2px;
    position: relative;
    transition: color 0.3s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 2px;
    background: ${C.pink};
    transition: width 0.3s;
  }
  .nav-link:hover { color: ${C.pink}; }
  .nav-link:hover::after { width: 100%; }

  /* Service Cards */
  .service-card {
    background: #fff;
    border-radius: 16px;
    padding: 24px 20px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: all 0.35s;
    cursor: pointer;
    border: 2px solid transparent;
  }
  .service-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(233,30,140,0.15);
    border-color: ${C.pink};
  }
  .service-icon {
    width: 64px; height: 64px;
    background: ${C.pinkLight};
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    font-size: 26px;
    transition: all 0.3s;
  }
  .service-card:hover .service-icon {
    background: ${C.pink};
  }

  /* Shop Cards */
  .shop-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    transition: transform 0.3s;
  }
  .shop-card:hover { transform: translateY(-5px); }

  /* Testimonial */
  .testimonial-card {
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    transition: transform 0.3s;
  }
  .testimonial-card:hover { transform: translateY(-4px); }

  /* Stats */
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 700;
    color: ${C.pink};
    line-height: 1;
  }

  /* Appointment banner */
  .appointment-banner {
    background: linear-gradient(135deg, ${C.pink} 0%, #c2185b 100%);
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    color: #fff;
  }

  /* Footer */
  .footer-link {
    color: #aaa;
    text-decoration: none;
    font-size: 13px;
    transition: color 0.3s;
    display: block;
    margin-bottom: 8px;
  }
  .footer-link:hover { color: ${C.pink}; }

  /* Responsive nav */
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
  }
  @media (min-width: 769px) {
    .mobile-menu-btn { display: none !important; }
    .mobile-nav { display: none !important; }
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: ${C.pink}; border-radius: 3px; }
`;
document.head.appendChild(styleEl);

/* ─── Data ──────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: "💅", name: "Nails & Pedicure", desc: "Luxury nail care with premium polish, shaping, and cuticle treatment for beautiful hands and feet.", id: 1 },
  { icon: "✨", name: "Aesthetic Treatments", desc: "Advanced skin aesthetic procedures tailored to rejuvenate and enhance your natural beauty.", id: 2 },
  { icon: "👁️", name: "Eyelash Lift", desc: "Long-lasting lash lift and tint that curls and defines your lashes without extensions.", id: 3 },
  { icon: "🌸", name: "Simple Foot Beauty", desc: "Relaxing foot care routine with scrub, massage, and polish for soft, pampered feet.", id: 4 },
];

const SHOP_PRODUCTS = [
  { name: "Anise Shortbread Hand Cream", price: "CHF 28", img: null, color: "#f9e4c8" },
  { name: "Tenderness Hand Cream", price: "CHF 32", img: null, color: "#d4edda" },
  { name: "Anise Shortbread Hand Cream", price: "CHF 28", img: null, color: "#f9e4c8" },
];

const TESTIMONIALS = [
  {
    name: "Sophie Molinet",
    rating: 5,
    text: "A wonderful experience at Céline's salon! Professional, warm, and my nails have never looked better. Highly recommend!",
    avatar: "S",
  },
  {
    name: "Roselyn T. Boykins",
    rating: 5,
    text: "Absolutely stunning results every single time! The attention to detail and luxurious treatments are worth every franc.",
    avatar: "R",
  },
  {
    name: "Eric J. Miller",
    rating: 5,
    text: "My wife dragged me along and I'm so glad she did! The head spa treatment was incredibly relaxing. We'll both be back.",
    avatar: "E",
  },
];

const STATS = [
  { num: "468+", label: "Happy Customers" },
  { num: "9+", label: "Diplomas Received" },
  { num: "14+", label: "Years of Experience" },
  { num: "200+", label: "Customer Reviews" },
];

const NAV_LINKS = ["Home", "About", "Services", "Gallery", "Our Pro", "Blog", "Contact"];

/* ─── Sub-components ─────────────────────────────────────────────── */

function TopBar() {
  return (
    <div style={{ background: C.pink, color: "#fff", padding: "8px 0", fontSize: "12px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span> Cheneau-de-Bourg Street, 1003 Lausanne, Switzerland</span>
        <div style={{ display: "flex", gap: 24 }}>
          <span> +41 78 949 40 39</span>
          <span>✉ info@celinesalon.ch</span>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
      boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span className="script" style={{ fontSize: 26, color: C.pink, fontWeight: 700 }}>Céline</span>
          <span style={{ fontSize: 10, color: C.gray, letterSpacing: 2, textTransform: "uppercase" }}>Esthétique & Beauty</span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map(l => <a key={l} href="#" className="nav-link">{l}</a>)}
        </div>

        {/* Right CTA */}
        <div className="desktop-nav" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-outline" style={{ padding: "8px 18px", fontSize: 12 }}>🔍</button>
          <button className="btn-pink" style={{ padding: "10px 20px", fontSize: 12 }}>Book Appointment</button>
        </div>

        {/* Mobile Menu */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: C.pink, display: "none" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="mobile-nav" style={{ background: "#fff", padding: "16px 24px", borderTop: `2px solid ${C.pinkLight}` }}>
          {NAV_LINKS.map(l => (
            <a key={l} href="#" className="nav-link" style={{ display: "block", padding: "10px 0", borderBottom: `1px solid ${C.pinkLight}` }}>{l}</a>
          ))}
          <button className="btn-pink" style={{ marginTop: 16, width: "100%" }}>Book Appointment</button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ background: "linear-gradient(135deg, #fff5fb 0%, #fff 60%, #fce4f3 100%)", padding: "60px 0 0", overflow: "hidden", position: "relative" }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: C.pinkLight, opacity: 0.5, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: 20, left: -40, width: 200, height: 200, borderRadius: "50%", background: "#fce4f3", opacity: 0.4, zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        {/* Left */}
        <div style={{ flex: "1 1 400px", paddingBottom: 60 }} className="fade-up">
          <p className="script" style={{ color: C.pink, fontSize: 18, marginBottom: 8 }}>Welcome to</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.15, color: "#111", marginBottom: 20 }}>
            <span className="script" style={{ color: C.pink, fontSize: "1.1em" }}>Céline</span>{" "}
            Esthétique<br />
            <span style={{ fontStyle: "italic" }}>City Centre</span>{" "}
            <span className="script" style={{ color: C.pink }}>Lausanne</span>
          </h1>
          <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.8, maxWidth: 480, marginBottom: 32 }}>
            Céline Esthétique City Centre Lausanne offers premium beauty and skincare treatments designed to enhance your natural glow. Experience expert care in a luxurious and relaxing environment.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-pink">Book Appointment</button>
            <button className="btn-outline">View Services</button>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 20, marginTop: 40, flexWrap: "wrap" }}>
            {[["14+", "Years Experience"], ["468+", "Happy Clients"], ["200+", "Reviews"]].map(([num, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 28, color: C.pink, fontWeight: 700 }}>{num}</div>
                <div style={{ fontSize: 11, color: C.gray, textTransform: "uppercase", letterSpacing: 1 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Image placeholder with design */}
        <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
          <div className="float-anim" style={{ position: "relative", width: 380, height: 420 }}>
            {/* Main circle */}
            <div style={{
              width: 320, height: 320,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fce4f3, #f8bbd0)",
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 120,
              boxShadow: "0 20px 60px rgba(233,30,140,0.2)",
              overflow: "hidden",
            }}>
              <img 
  src="girl2.png" 
  alt="Salon Banner" 
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%'
  }}
/>
            </div>
            {/* Floating badges */}
            {[
              {  label: "Nail Art", top: 10, left: 0 },
              {  label: "Aesthetic", top: 10, right: 0 },
              {  label: "Beauty", bottom: 60, left: -20 },
            ].map(({ emoji, label, ...pos }) => (
              <div key={label} style={{
                position: "absolute", ...pos,
                background: "#fff", borderRadius: 12, padding: "8px 14px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
                animation: "fadeInUp 0.7s ease forwards",
              }}>
                <span style={{ fontSize: 18 }}>{emoji}</span>
                <span style={{ color: "#333" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SalonIntro() {
  return (
    <section style={{ padding: "70px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <span className="section-label" style={{ fontSize: 28 }}>Céline nail salon Aesthetic</span>
        <h2 className="section-title" style={{ marginBottom: 16 }}>
          Lausanne <span>city center</span>
        </h2>
        <p style={{ color: C.gray, maxWidth: 600, margin: "0 auto 56px", lineHeight: 1.8 }}>
          Make your visit to Céline nail salon memorable and regular services and aesthetic beauty treatments will be individualized and adapted to your needs and desires.
        </p>

        {/* Services Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {SERVICES.map((s) => (
            <div key={s.id} className="service-card">
              <div className="service-icon">
                <span style={{ fontSize: 28 }}>{s.icon}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "#222" }}>{s.name}</h3>
              <p style={{ fontSize: 12, color: C.gray, lineHeight: 1.6, marginBottom: 14 }}>{s.desc}</p>
              <a href="#" style={{ color: C.pink, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section style={{ padding: "70px 0", background: C.beige }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
        {/* Image side */}
        <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 280, height: 280,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fce4f3, #f8bbd0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 100,
              boxShadow: "0 0 0 12px #fff, 0 0 0 16px " + C.pinkMid,
              animation: "pulse-ring 2s infinite",
              overflow: "hidden",
            }}>
              <img 
  src="manicure.png" 
  alt="Salon Banner" 
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%'
  }}
/>
            </div>
            <div style={{
              position: "absolute", bottom: -10, right: -10,
              background: C.pink, color: "#fff", borderRadius: 12,
              padding: "12px 18px", textAlign: "center",
              boxShadow: "0 8px 24px rgba(233,30,140,0.3)",
            }}>
              <div style={{ fontFamily: "'Dancing Script',cursive", fontSize: 22, fontWeight: 700 }}>14+</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Years Exp.</div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div style={{ flex: "1 1 400px" }}>
          <span className="section-label">About Us</span>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            Céline Nail Salon<br />
            And <span>Aesthetic</span>
          </h2>
          <p style={{ color: C.gray, lineHeight: 1.9, marginBottom: 16 }}>
            Skilled and meticulous, qualified and passionate about my profession, it is with great pleasure that I strive to make you shine. My passion led me to open a salon setting in the city center of Lausanne (Escalier de bânes 1) over 1 year from now.
          </p>
          <p style={{ color: C.gray, lineHeight: 1.9, marginBottom: 28 }}>
            Born during lockdown, all donations, deal-cuts (hands and feet), relaxing atmosphere, soothing setting await you. I'm all-natural in a new era of science and pamper yourself head salon in Lausanne nail beauty.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <button className="btn-pink">Book Appointment</button>
            <button className="btn-outline">Our Services</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurShop() {
  return (
    <section style={{ padding: "70px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="section-title">Our <span>Shop</span></h2>
          <p style={{ color: C.gray, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            The latest collection from our favorite professional brands. Visit our store for nails and other professionals.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
          {SHOP_PRODUCTS.map((p, i) => (
            <div key={i} className="shop-card">
              <div style={{
                height: 250, background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 60,
              }}>
                <img 
  src="product1.png" 
  alt="Salon Banner" 
  style={{
    width: '90%',
    height: '90%',
    objectFit: 'cover',
    // borderRadius: '50%'
  }}
  
/>
              </div>
              <div style={{ padding: "20px 16px" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#222", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.name}</h3>
                <p style={{ color: C.pink, fontWeight: 700, fontSize: 16, marginBottom: 14 }}>{p.price}</p>
                <button className="btn-pink" style={{ width: "100%", padding: "10px 0", borderRadius: 8 }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function HeadSpa() {
  return (
    <section style={{ background: C.pinkLight, padding: "70px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", opacity: 0.15, background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23e91e8c"/></svg>') center/cover` }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
        {/* Left text */}
        <div style={{ flex: "1 1 400px", color: C.black }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.2, marginBottom: 12 }}>
            New Head{" "}
            <span className="script" style={{ color: C.pink }}>Spa</span>
            <br />Treatment in Lausanne
          </h2>
          <p style={{ color: C.pinkDark, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, fontSize: 12, marginBottom: 20 }}>
            Hair Relaxation and Revitalization
          </p>
          <p style={{ color: C.gray, lineHeight: 1.9, marginBottom: 28, maxWidth: 480 }}>
            Discover more with our top-tier head spa treatment, offered at Céline Esthétique in Lausanne. Head Relaxation promotes relaxation through scalp massage, using advanced techniques to activate acupressure points. The natural beauty of your hair is restored with every session, leaving you feeling refreshed and renewed.
          </p>
          <button className="btn-pink">Book Appointment</button>
        </div>

        {/* Right image */}
        <div style={{ flex: "1 1 340px" }}>
          <div style={{
            background: "linear-gradient(135deg, #2a1a2e, #3d1a3d)",
            borderRadius: 20,
            height: 350,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 100,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            position: "relative", overflow: "hidden",
          }}>
            <img 
  src="headspa.png" 
  alt="Salon Banner" 
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // borderRadius: '50%'
  }}
/>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(233,30,140,0.3))",
              height: "50%",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ padding: "70px 0", background: C.lightGray }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="section-title">What is <span>People Say</span></h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.pink}, ${C.pinkDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 18,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: C.gray }}>Verified Client</div>
                </div>
                {/* Google G */}
                <div style={{ marginLeft: "auto", width: 28, height: 28, borderRadius: "50%", background: "#fff", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#4285f4" }}>G</div>
              </div>
              <div style={{ color: "#ffd700", fontSize: 16, marginBottom: 10 }}>
                {"★".repeat(t.rating)}
              </div>
              <p style={{ color: C.gray, fontSize: 13, lineHeight: 1.7 }}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        STATS.forEach((s, i) => {
          const target = parseInt(s.num);
          let current = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            setCounts(prev => { const n = [...prev]; n[i] = current; return n; });
            if (current >= target) clearInterval(interval);
          }, 40);
        });
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "70px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 40, textAlign: "center" }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div className="stat-num">{counts[i]}{s.num.includes("+") ? "+" : ""}</div>
              <div style={{ color: C.gray, fontSize: 13, marginTop: 8, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppointmentBanner() {
  return (
    <section style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="appointment-banner">
          <span className="script" style={{ fontSize: 36, color: "rgba(255,255,255,0.9)", display: "block", marginBottom: 8 }}>Appointment Online</span>
          <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7 }}>
            Have you have an appointment online and found out availability? We invite you to fill in the form below, choose the services and appointment time that suits you best.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#fff", color: C.pink, border: "none", padding: "12px 28px", borderRadius: 30, fontFamily: "'Poppins',sans-serif", fontWeight: 600, cursor: "pointer", fontSize: 13, transition: "all 0.3s" }}
              onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
              onMouseOut={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
               Make Appointment
            </button>
            <button style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)", padding: "12px 28px", borderRadius: 30, fontFamily: "'Poppins',sans-serif", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
              Call Us Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section style={{ padding: "70px 0", background: C.lightGray }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Contact <span>Us</span></h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#222" }}>Send a Message</h3>
            {[["Name", "name", "text"], ["Email", "email", "email"]].map(([label, field, type]) => (
              <div key={field} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#444" }}>{label}</label>
                <input type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                  placeholder={`Your ${label}`}
                  style={{ width: "100%", padding: "12px 16px", border: `2px solid #eee`, borderRadius: 10, fontFamily: "'Poppins',sans-serif", fontSize: 13, outline: "none", transition: "border 0.3s" }}
                  onFocus={e => e.target.style.borderColor = C.pink}
                  onBlur={e => e.target.style.borderColor = "#eee"} />
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#444" }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Your message here..."
                rows={4}
                style={{ width: "100%", padding: "12px 16px", border: "2px solid #eee", borderRadius: 10, fontFamily: "'Poppins',sans-serif", fontSize: 13, outline: "none", resize: "vertical", transition: "border 0.3s" }}
                onFocus={e => e.target.style.borderColor = C.pink}
                onBlur={e => e.target.style.borderColor = "#eee"} />
            </div>
            <button className="btn-pink" style={{ width: "100%" }}>Send Message ✉</button>
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { icon: "📍", title: "Address", text: "Cheneau-de-Bourg Street\n1003 Lausanne, Switzerland" },
              { icon: "📞", title: "Phone", text: "+41 78 949 40 39" },
              { icon: "✉", title: "Email", text: "info@celinesalon.ch" },
              { icon: "🕐", title: "Opening Hours", text: "Mon–Fri: 9:00 – 19:00\nSat: 9:00 – 17:00" },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.pinkLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: C.gray, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line" }}>{text}</div>
                </div>
              </div>
            ))}

            {/* Map embed placeholder */}
            <div style={{ background: "#e8e8e8", borderRadius: 16, height: 160, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, overflow: "hidden" }}>
              <span style={{ fontSize: 40 }}>🗺️</span>
              <span style={{ fontSize: 13, color: C.gray }}>Cheneau-de-Bourg Street, Lausanne</span>
              <a href="https://maps.google.com/?q=Cheneau-de-Bourg+Street+1003+Lausanne" target="_blank" rel="noreferrer"
                style={{ color: C.pink, fontSize: 12, textDecoration: "none", fontWeight: 600 }}>Open in Maps →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#111", color: "#ccc", padding: "60px 0 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Dancing Script',cursive", fontSize: 30, color: C.pink, fontWeight: 700, marginBottom: 12 }}>Céline</div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 20 }}>
              Premium beauty salon in Lausanne, Switzerland. Offering luxury nail, aesthetic, and beauty treatments.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["f", "in", "ig"].map(s => (
                <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: "50%", background: "#222", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 12, textDecoration: "none", transition: "all 0.3s" }}
                  onMouseOver={e => { e.currentTarget.style.background = C.pink; e.currentTarget.style.color = "#fff"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "#222"; e.currentTarget.style.color = "#ccc"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Quick Links", links: ["Home", "About Us", "Services", "Gallery", "Blog", "Contact"] },
            { title: "Services", links: ["Nail & Pedicure", "Aesthetic", "Eyelash Lift", "Hair Removal", "Head Spa", "Foot Beauty"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>{title}</h4>
              {links.map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Contact</h4>
            {[
              [ "Cheneau-de-Bourg Street\n1003 Lausanne, Switzerland"],
              ["📞", "+41 78 949 40 39"],
              ["✉", "info@celinesalon.ch"],
            ].map(([icon, text]) => (
              <div key={icon} style={{ display: "flex", gap: 10, marginBottom: 14, color: "#888", fontSize: 13, lineHeight: 1.6 }}>
                <span>{icon}</span>
                <span style={{ whiteSpace: "pre-line" }}>{text}</span>
              </div>
            ))}

            {/* App badges */}
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              {["App Store", "Google Play", "Microsoft"].map(b => (
                <button key={b} style={{ background: "#222", border: "1px solid #333", color: "#aaa", padding: "6px 12px", borderRadius: 8, fontSize: 10, cursor: "pointer", transition: "all 0.3s" }}
                  onMouseOver={e => { e.target.style.borderColor = C.pink; e.target.style.color = "#fff"; }}
                  onMouseOut={e => { e.target.style.borderColor = "#333"; e.target.style.color = "#aaa"; }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #222", padding: "20px 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#666" }}>© 2024 Céline Esthétique. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <a key={l} href="#" style={{ color: "#666", fontSize: 12, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main App ───────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <TopBar />
      <Navbar />
      <Hero />
      <SalonIntro />
      <About />
      <OurShop />
      <HeadSpa />
      <Testimonials />
      <Stats />
      <AppointmentBanner />
      <Contact />
      <Footer />
    </div>
  );
}