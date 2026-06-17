const NAV_LINKS = ["Home", "Serviços", "Portfólio"];

export default function Footer() {
  const scrollTo = (id) => {
    const map = {
      "Home": "home",
      "Serviços": "servicos",
      "Portfólio": "portfolio",
    };
    const el = document.getElementById(map[id]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.07] py-8 px-6 bg-[#040710]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <button onClick={() => scrollTo("Home")} className="flex items-center gap-2 group">
          <span className="font-black text-lg">
            <span className="text-white">DG</span>
            <span className="text-[#6C63FF]">tech</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#6C63FF] group-hover:scale-150 transition-transform" />
        </button>

        <p className="text-white/30 text-sm">© 2026 DGtech. Todos os direitos reservados.</p>

        {/* Links */}
        <div className="flex gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-white/30 hover:text-white text-xs transition-colors"
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}