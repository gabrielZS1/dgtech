import { useState, useEffect, useRef } from "react";
import { TEAM, SERVICES, PROJECTS } from '../data/data';


/* ─── helpers ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", y = 40 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s,
                     transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Floating particles */
function Particles() {
  const pts = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 1 + Math.random() * 2.5,
      dur: 6 + Math.random() * 8,
      del: Math.random() * 5,
    }))
  );
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {pts.current.map((p) => (
        <circle key={p.id} cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill="#6C63FF" opacity="0.18">
          <animate attributeName="cy" values={`${p.y}%;${p.y - 4}%;${p.y}%`} dur={`${p.dur}s`} begin={`${p.del}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.18;0.38;0.18" dur={`${p.dur}s`} begin={`${p.del}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ─── HERO ─── */
function Hero({ scrollTo }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080C14]">
      <Particles />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "linear-gradient(rgba(108,99,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.6) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Orb que segue o mouse */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)",
          left: `calc(${mousePos.x * 100}% - 300px)`,
          top: `calc(${mousePos.y * 100}% - 300px)`,
          transition: "left 1.2s cubic-bezier(.22,1,.36,1), top 1.2s cubic-bezier(.22,1,.36,1)",
        }}
      />

      <div className="absolute bottom-[10%] right-[8%] w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 mt-20"
          style={{ background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
          <span className="text-[#a78bfa] text-xs font-bold tracking-widest uppercase">Soluções digitais sob medida</span>
        </div>

        <h1 className="font-black leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(2.6rem,7vw,5.2rem)", letterSpacing: -2 }}>
          <span className="text-white">Sistemas que</span>
          <br />
          <span className="bg-gradient-to-r from-[#6C63FF] via-[#a78bfa] to-[#c4b5fd] bg-clip-text text-transparent">
            evoluem com você
          </span>
        </h1>

        <p className="text-white/45 leading-relaxed max-w-[560px] mx-auto mb-10" style={{ fontSize: "clamp(1rem,2vw,1.15rem)" }}>
          Do protótipo ao deploy — a DGtech constrói software robusto e escalável para empresas que querem crescer de verdade.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("portfolio")}
            className="font-bold rounded-full text-white transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg,#6C63FF,#8b83ff)",
              padding: "14px 32px", fontSize: 15,
              boxShadow: "0 8px 32px rgba(108,99,255,0.45)",
            }}
          >
            Ver Projetos
          </button>
          <button
            onClick={() => scrollTo("contato")}
            className="font-semibold rounded-full text-white/75 hover:text-white hover:border-[#6C63FF]/50 transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "14px 32px", fontSize: 15,
            }}
          >
            Falar com a equipe →
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-8 border-t border-white/[0.07] flex justify-center gap-16">
          {[["3+", "Projetos entregues"], ["100%", "Clientes satisfeitos"], ["6", "Especialistas"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-black bg-gradient-to-r from-[#6C63FF] to-[#a78bfa] bg-clip-text text-transparent"
                style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>{n}</p>
              <p className="text-white/35 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 text-[10px] tracking-widest uppercase">
        scroll
        <div className="w-px h-10 bg-gradient-to-b from-[#6C63FF]/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

/* ─── SOBRE NÓS ─── */
function Sobre() {
  return (
    <section id="sobre-nos" className="py-28 px-6 bg-[#080C14] relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-0.5 bg-[#6C63FF]" />
            <span className="text-[#6C63FF] text-[11px] font-bold tracking-[2.5px] uppercase">Sobre Nós</span>
          </div>
          <h2 className="font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: -1.5 }}>
            Quem está por trás
            <br />
            <span className="text-white/25">da DGtech</span>
          </h2>
          <p className="text-white/45 leading-relaxed max-w-lg mb-16" style={{ fontSize: "clamp(0.95rem,1.5vw,1.1rem)" }}>
            Somos um time de desenvolvedores apaixonados por tecnologia — comprometidos em transformar desafios reais em soluções digitais modernas, escaláveis e eficientes.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.07}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member: m }) {
  return (
    <div className="group relative bg-white/[0.025] hover:bg-[#6C63FF]/[0.06] border border-white/[0.06] hover:border-[#6C63FF]/35 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(108,99,255,0.12)]">
      <div className="aspect-square overflow-hidden bg-[#0d1220]">
        {m.image ? (
          <img
            src={m.image}
            alt={m.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.06] group-hover:brightness-90"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">👤</div>
        )}
      </div>
      <div className="p-5">
        <p className="font-extrabold text-white text-[15px] tracking-tight mb-1">{m.name}</p>
        <p className="text-[#8b83ff] text-sm font-medium">{m.role}</p>
      </div>
    </div>
  );
}

/* ─── SERVIÇOS ─── */
function Servicos({ scrollTo }) {
  return (
    <section id="servicos" className="py-28 px-6 bg-[#060A12] relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#6C63FF]/40" />
      <div className="absolute left-[15%] bottom-[20%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-0.5 bg-[#6C63FF]" />
            <span className="text-[#6C63FF] text-[11px] font-bold tracking-[2.5px] uppercase">O que fazemos</span>
            <div className="w-6 h-0.5 bg-[#6C63FF]" />
          </div>
          <h2 className="font-black text-center leading-tight mb-4" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: -1.5 }}>
            Serviços &amp; Soluções
          </h2>
          <p className="text-white/40 text-center leading-relaxed max-w-xl mx-auto mb-16" style={{ fontSize: "clamp(0.95rem,1.5vw,1.05rem)" }}>
            Desenvolvemos sistemas completos, pensados do zero para o seu negócio — do back-end à experiência do usuário.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.065}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal delay={0.3}>
          <div className="mt-16 rounded-2xl p-10 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(108,99,255,0.18) 0%, rgba(167,139,250,0.08) 100%)",
              border: "1px solid rgba(108,99,255,0.2)",
            }}>
            <div className="absolute right-0 top-0 w-60 h-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at right, rgba(167,139,250,0.1) 0%, transparent 70%)" }} />
            <div>
              <p className="font-black text-white mb-1" style={{ fontSize: "clamp(1.1rem,2vw,1.3rem)" }}>Tem um projeto em mente?</p>
              <p className="text-white/45 text-sm">A primeira conversa é sempre sem compromisso.</p>
            </div>
            <button
              onClick={() => scrollTo("contato")}
              className="shrink-0 font-bold rounded-full text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#6C63FF,#8b83ff)",
                padding: "14px 32px", fontSize: 14,
                boxShadow: "0 8px 24px rgba(108,99,255,0.4)",
              }}
            >
              Solicitar Orçamento
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service: s }) {
  return (
    <div className="group bg-white/[0.025] hover:bg-[#6C63FF]/[0.07] border border-white/[0.06] hover:border-[#6C63FF]/30 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(108,99,255,0.1)]">
      <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 group-hover:bg-[#6C63FF]/20 flex items-center justify-center text-2xl mb-5 transition-colors">
        {s.icon}
      </div>
      <h3 className="font-extrabold text-white text-[15px] tracking-tight mb-2">{s.title}</h3>
      <p className="text-white/38 text-sm leading-relaxed">{s.desc}</p>
    </div>
  );
}

/* ─── PORTFÓLIO ─── */
function Portfolio() {
  return (
    <section id="portfolio" className="py-28 px-6 bg-[#080C14] relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-0.5 bg-[#6C63FF]" />
            <span className="text-[#6C63FF] text-[11px] font-bold tracking-[2.5px] uppercase">Portfólio</span>
          </div>
          <h2 className="font-black leading-tight mb-3" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: -1.5 }}>
            Projetos realizados
          </h2>
          <p className="text-white/40 leading-relaxed max-w-md mb-14" style={{ fontSize: "clamp(0.95rem,1.5vw,1.05rem)" }}>
            Conheça sistemas que construímos do zero para nossos clientes.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] hover:border-[p.accent]/40 transition-all duration-400 hover:shadow-[0_16px_48px_rgba(108,99,255,0.15)]"
      style={{ "--accent": p.accent }}>

      <div className="aspect-video relative overflow-hidden bg-[#0d1220]">
        {/* Gradient fallback */}
        <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} style={{ opacity: p.image ? 0 : 1 }} />

        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover transition-all duration-600 group-hover:scale-[1.07] group-hover:brightness-75"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">{p.emoji}</span>
          </div>
        )}

        {/* Tag */}
        <div className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border backdrop-blur-md"
          style={{ color: p.accent, borderColor: `${p.accent}55`, background: "rgba(0,0,0,0.5)" }}>
          {p.tag}
        </div>

        {/* Hover info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between
          translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-400"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
          <div>
            <p className="text-white font-bold text-sm">{p.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{p.description}</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${p.accent}22`, border: `1px solid ${p.accent}66` }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={p.accent} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 bg-white/[0.025]">
        <p className="text-white font-bold text-sm">{p.name}</p>
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: p.accent }}>{p.tag}</span>
      </div>

      {/* Accent border on hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: `${p.accent}55` }} />
    </div>
  );
}

/* ─── CONTATO ─── */
function Contato() {
  const [fields, setFields] = useState({ nome: "", email: "", empresa: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!fields.nome || !fields.email || !fields.msg) return;
    setSent(true);
  };

  return (
    <section id="contato" className="py-28 px-6 bg-[#060A12] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(108,99,255,0.1) 0%, transparent 70%)" }} />

      <div className="max-w-xl mx-auto relative z-10">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-0.5 bg-[#6C63FF]" />
            <span className="text-[#6C63FF] text-[11px] font-bold tracking-[2.5px] uppercase">Contato</span>
            <div className="w-6 h-0.5 bg-[#6C63FF]" />
          </div>
          <h2 className="font-black text-center leading-tight mb-3" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: -1.5 }}>
            Vamos conversar?
          </h2>
          <p className="text-white/40 text-center leading-relaxed mb-12" style={{ fontSize: "clamp(0.9rem,1.5vw,1.05rem)" }}>
            Descreva seu projeto e nossa equipe entra em contato em até 24h.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl p-8 md:p-10"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-5">✉️</div>
                <p className="font-black text-xl text-white mb-2">Mensagem enviada!</p>
                <p className="text-white/40 text-sm">Em breve nossa equipe entrará em contato.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nome" placeholder="Seu nome" value={fields.nome} onChange={v => setFields(f => ({ ...f, nome: v }))} />
                  <Field label="E-mail" type="email" placeholder="seu@email.com" value={fields.email} onChange={v => setFields(f => ({ ...f, email: v }))} />
                </div>
                <Field label="Empresa" placeholder="Nome da sua empresa" value={fields.empresa} onChange={v => setFields(f => ({ ...f, empresa: v }))} />
                <Field label="Mensagem" placeholder="Descreva seu projeto ou necessidade..." value={fields.msg} onChange={v => setFields(f => ({ ...f, msg: v }))} multiline />
                <button
                  onClick={handleSend}
                  className="w-full font-bold text-white rounded-2xl py-4 transition-all hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg,#6C63FF,#8b83ff)",
                    fontSize: 15, letterSpacing: 0.3,
                    boxShadow: "0 8px 32px rgba(108,99,255,0.4)",
                  }}
                >
                  Enviar Mensagem →
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, placeholder, value, onChange, type = "text", multiline = false }) {
  const [focused, setFocused] = useState(false);
  const base = `w-full rounded-xl px-4 py-3 text-white text-sm outline-none font-sans transition-all duration-200 ${
    focused
      ? "bg-[#6C63FF]/[0.05] border border-[#6C63FF]/50"
      : "bg-white/[0.03] border border-white/[0.08]"
  }`;
  return (
    <div>
      <label className="block text-white/40 text-[11px] font-bold tracking-[1.5px] uppercase mb-2">{label}</label>
      {multiline ? (
        <textarea
          rows={4} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`${base} resize-none placeholder-white/20`}
        />
      ) : (
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={`${base} placeholder-white/20`}
        />
      )}
    </div>
  );
}

/* ─── ROOT ─── */
export default function DGtech() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#080C14] text-white font-sans antialiased">
      <Hero scrollTo={scrollTo} />
      <Sobre />
      <Servicos scrollTo={scrollTo} />
      <Portfolio />
      <Contato />

    </div>
  );
}