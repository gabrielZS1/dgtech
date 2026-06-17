import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "Sobre Nós", "Serviços", "Portfólio", "Contato"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActive(id);
    const map = {
      "Home": "home",
      "Sobre Nós": "sobre-nos",
      "Serviços": "servicos",
      "Portfólio": "portfolio",
      "Contato": "contato",
    };
    const el = document.getElementById(map[id] || id.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#080C14]/95 backdrop-blur-md shadow-lg shadow-black/40 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo("Home")} className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-white">DG</span>
            <span className="text-[#6C63FF]">tech</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] mt-1 group-hover:scale-150 transition-transform" />
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${active === l ? "text-[#6C63FF]" : "text-white/60 hover:text-white"}`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo("Contato")}
          className="hidden md:inline-flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5a52e0] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          Fale Conosco
        </button>

        {/* Hamburger */}
        <button className="md:hidden text-white flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1220] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`text-left text-sm font-medium transition-colors ${active === l ? "text-[#6C63FF]" : "text-white/70 hover:text-white"}`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}