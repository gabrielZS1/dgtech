export default function Footer() {
    return (
        <footer className="border-t border-white/[0.07] py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-black text-lg">
                    <span className="text-white">DG</span>
                    <span className="text-[#6C63FF]">tech</span>
                </span>
                <p className="text-white/30 text-sm">© 2025 DGtech. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    {["Home", "Serviços", "Portfólio"].map((l) => (
                        <button key={l} onClick={() => scrollTo(l)} className="text-white/30 hover:text-white text-xs transition-colors">
                            {l}
                        </button>
                    ))}
                </div>
            </div>
        </footer>
    );
}