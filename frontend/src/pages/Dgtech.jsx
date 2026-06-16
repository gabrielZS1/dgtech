import { useState, useEffect, useRef } from "react";
import { TEAM, SERVICES, PROJECTS } from '../data/data';



function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

export default function DGtech() {
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
        const el = document.getElementById(id.toLowerCase().replace(" ", "-").replace("ó", "o").replace("ê", "e").replace("é", "e"));
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-[#080C14] text-white font-sans antialiased">

            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(rgba(108,99,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.3) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="absolute inset-0 bg-gradient-radial from-[#6C63FF]/20 via-transparent to-transparent" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(108,99,255,0.18) 0%, transparent 70%)" }} />

                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#6C63FF]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-[#a78bfa]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1.5s" }} />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">


                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 mt-10">
                        Tecnologia que{" "}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#a78bfa]">transforma</span>
                        </span>
                        <br />o seu negócio
                    </h1>

                    <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Na DGtech desenvolvemos sistemas sob medida para empresas de todos os portes. Do protótipo ao deploy, estamos com você.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => scrollTo("Portfólio")}
                            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#6C63FF]/30"
                        >
                            Ver Projetos
                        </button>
                        <button
                            onClick={() => scrollTo("Contato")}
                            className="border border-white/20 hover:border-[#6C63FF]/60 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-full transition-all"
                        >
                            Falar com a equipe →
                        </button>
                    </div>


                    <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-white/10 pt-10">
                        {[["3+", "Projetos entregues"], ["100%", "Clientes satisfeitos"], ["6", "Especialistas"]].map(([n, l]) => (
                            <div key={l} className="text-center">
                                <p className="text-2xl font-black text-[#6C63FF]">{n}</p>
                                <p className="text-white/40 text-xs mt-1">{l}</p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
                </div>
            </section>


            <section id="sobre-nos" className="py-28 px-6 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#6C63FF]/5 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto">
                    <FadeIn>
                        <p className="text-[#6C63FF] text-xs font-bold tracking-widest uppercase mb-3">
                            Sobre Nós
                        </p>

                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Quem está por trás
                            <br />
                            <span className="text-white/40">da DGtech</span>
                        </h2>

                        <p className="text-white/50 max-w-xl text-lg leading-relaxed mb-16">
                            Somos um time apaixonado por tecnologia, comprometido em
                            transformar desafios reais em soluções digitais modernas,
                            escaláveis e eficientes.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {TEAM.map((m, i) => (
                            <FadeIn key={m.name} delay={i * 0.08}>
                                <div className="group relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-[#6C63FF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">

                                    <div className="aspect-square overflow-hidden bg-[#0d1220]">
                                        {m.image ? (
                                            <img
                                                src={m.image}
                                                alt={m.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-6xl text-white/20">
                                                👤
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-bold text-white text-base">
                                            {m.name}
                                        </h3>

                                        <p className="text-[#6C63FF] text-sm mt-1">
                                            {m.role}
                                        </p>
                                    </div>

                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>


            <section id="servicos" className="py-28 px-6 bg-[#0a0f1a] relative">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#6C63FF]/40" />
                <div className="max-w-6xl mx-auto">
                    <FadeIn className="text-center mb-16">
                        <p className="text-[#6C63FF] text-xs font-bold tracking-widest uppercase mb-3">O que fazemos</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Serviços & Produtos</h2>
                        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
                            Desenvolvemos sistemas completos para empresas de todos os segmentos — desde startups até grandes operações. Cada solução é construída do zero, pensada para o seu negócio.
                        </p>
                    </FadeIn>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICES.map((s, i) => (
                            <FadeIn key={s.title} delay={i * 0.07}>
                                <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-[#6C63FF]/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#6C63FF]/20 transition-colors">
                                        {s.icon}
                                    </div>
                                    <h3 className="font-bold text-white mb-2">{s.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>


                    <FadeIn delay={0.3}>
                        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#6C63FF]/20 to-[#a78bfa]/10 border border-[#6C63FF]/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="font-black text-xl">Tem um projeto em mente?</p>
                                <p className="text-white/50 text-sm mt-1">Conte para a gente. A primeira conversa é sem compromisso.</p>
                            </div>
                            <button
                                onClick={() => scrollTo("Contato")}
                                className="shrink-0 bg-[#6C63FF] hover:bg-[#5a52e0] font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105"
                            >
                                Solicitar Orçamento
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section id="portfolio" className="py-28 px-6 relative overflow-hidden">
                <div className="absolute left-0 top-1/3 w-80 h-80 bg-[#6C63FF]/6 rounded-full blur-3xl" />
                <div className="max-w-6xl mx-auto">
                    <FadeIn className="mb-16">
                        <p className="text-[#6C63FF] text-xs font-bold tracking-widest uppercase mb-3">Portfólio</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Projetos realizados</h2>
                        <p className="text-white/50 max-w-xl text-lg leading-relaxed">
                            Conheça alguns dos sistemas que desenvolvemos para nossos clientes.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-5">
  {PROJECTS.map((p, i) => (
    <FadeIn key={p.name} delay={i * 0.12}>
      <div className="group relative overflow-hidden rounded-xl cursor-pointer">
  <div className={`aspect-video bg-gradient-to-br ${p.color} relative overflow-hidden`}>

    {p.image ? (
      <img
        src={p.image}
        alt={p.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    ) : (
      <>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30">
            {p.emoji}
          </span>
        </div>
      </>
    )}

    {/* ── FUNDO ATRÁS DA FOTO: painel glassmorphism no rodapé ── */}
    <div
      className="absolute bottom-0 left-0 right-0 h-24
                 translate-y-1 opacity-0
                 group-hover:translate-y-0 group-hover:opacity-100
                 transition-all duration-500 ease-out"
      style={{
        background: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      <div className="flex items-center justify-between h-full px-4">
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{p.name}</p>
          <p className="text-white/50 text-xs mt-0.5">{p.description}</p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `${p.accent}33`, border: `1px solid ${p.accent}66` }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: p.accent }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>

    {/* Tag */}
    <div
      className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border backdrop-blur-md"
      style={{
        color: p.accent,
        borderColor: `${p.accent}55`,
        background: "rgba(0,0,0,0.45)",
      }}
    >
      {p.tag}
    </div>
  </div>

  {/* Borda accent no hover */}
  <div
    className="absolute inset-0 rounded-xl pointer-events-none border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{ borderColor: `${p.accent}66` }}
  />
</div>
    </FadeIn>
  ))}
</div>
                </div>
            </section>

            <section id="contato" className="py-28 px-6 bg-[#0a0f1a] relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(108,99,255,0.12) 0%, transparent 70%)" }} />
                <div className="max-w-2xl mx-auto relative z-10">
                    <FadeIn className="text-center mb-12">
                        <p className="text-[#6C63FF] text-xs font-bold tracking-widest uppercase mb-3">Contato</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Vamos conversar?</h2>
                        <p className="text-white/50 text-lg">
                            Descreva seu projeto e nossa equipe entra em contato em até 24h.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-10 space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-white/50 text-xs font-semibold uppercase tracking-widest block mb-2">Nome</label>
                                    <input type="text" placeholder="Seu nome" className="w-full bg-white/[0.04] border border-white/10 focus:border-[#6C63FF]/60 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors text-sm" />
                                </div>
                                <div>
                                    <label className="text-white/50 text-xs font-semibold uppercase tracking-widest block mb-2">E-mail</label>
                                    <input type="email" placeholder="seu@email.com" className="w-full bg-white/[0.04] border border-white/10 focus:border-[#6C63FF]/60 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="text-white/50 text-xs font-semibold uppercase tracking-widest block mb-2">Empresa</label>
                                <input type="text" placeholder="Nome da sua empresa" className="w-full bg-white/[0.04] border border-white/10 focus:border-[#6C63FF]/60 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors text-sm" />
                            </div>
                            <div>
                                <label className="text-white/50 text-xs font-semibold uppercase tracking-widest block mb-2">Mensagem</label>
                                <textarea rows={4} placeholder="Descreva seu projeto ou necessidade..." className="w-full bg-white/[0.04] border border-white/10 focus:border-[#6C63FF]/60 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-colors text-sm resize-none" />
                            </div>
                            <button className="w-full bg-[#6C63FF] hover:bg-[#5a52e0] font-bold py-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6C63FF]/30 text-sm tracking-wide">
                                Enviar Mensagem →
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </div>
    );
}