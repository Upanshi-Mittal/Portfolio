import { LayoutGrid, Server, Code2, Cpu, Rocket, ChevronDown } from "lucide-react";

const CARDS = [
  {
    id: "design",
    icon: LayoutGrid,
    title: "Design interfaces",
    description: "Responsive, animated, accessible UI systems.",
    stack: "React · Tailwind · GSAP · Three.js",
    size: "tall",
  },
  {
    id: "apis",
    icon: Server,
    title: "Build APIs",
    stack: "Node.js · Express · MongoDB · MySQL",
    size: "small",
  },
  {
    id: "languages",
    icon: Code2,
    title: "Programming languages",
    stack: "Python · JavaScript · C · C++",
    size: "small",
  },
  {
    id: "models",
    icon: Cpu,
    title: "Train models",
    description: "Applied ML and computer vision pipelines.",
    stack: "Python · TensorFlow · OpenCV · Scikit-learn",
    size: "wide",
  },
  {
    id: "ship",
    icon: Rocket,
    title: "Ship software",
    stack: "Git · Docker",
    size: "wide",
  },
];

function Card({ card }) {
  const Icon = card.icon;

  if (card.size === "tall") {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-7 flex flex-col h-full min-h-56 gap-5 md:min-h-0 hover:border-zinc-700 transition-colors "style={{ padding:"20px"}}>
        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 ">
          <Icon size={18} strokeWidth={2} />
        </div>
        <div className="md:mt-0 " style={{padding:"-10px 0 0 0"}}>
          <h3 className="font-serif text-2xl md:text-3xl text-zinc-100 mb-3">{card.title}</h3>
          {card.description && (
            <p className="text-zinc-500 text-sm mb-3">{card.description}</p>
          )}
          <p className="text-zinc-500 text-sm">{card.stack}</p>
        </div>
      </div>
    );
  }

  if (card.size === "small") {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-6 hover:border-zinc-700 transition-colors" style={{ padding:"20px"}}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-indigo-400 flex-shrink-0">
            <Icon size={18} strokeWidth={2} />
          </span>
          <h3 className="font-serif text-lg md:text-xl text-zinc-100">{card.title}</h3>
        </div>
        <p className="text-zinc-500 text-sm">{card.stack}</p>
      </div>
    );
  }

  // wide
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-6 hover:border-zinc-700 transition-colors" style={{ padding:"20px"}}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-3">
          <span className="text-indigo-400 flex-shrink-0">
            <Icon size={18} strokeWidth={2} />
          </span>
          <h3 className="font-serif text-lg md:text-xl text-zinc-100 whitespace-nowrap">{card.title}</h3>
        </div>
        {card.description && (
          <>
            <span className="hidden sm:block w-px h-5 bg-zinc-800 flex-shrink-0" />
            <p className="text-zinc-500 text-sm">{card.description}</p>
          </>
        )}
        <span className="hidden sm:block w-px h-5 bg-zinc-800 flex-shrink-0 sm:ml-auto" />
        <p className="text-zinc-500 text-sm sm:text-right">{card.stack}</p>
      </div>
    </div>
  );
}

export default function skills() {
  const tall = CARDS.find((c) => c.id === "design");
  const small = CARDS.filter((c) => c.size === "small");
  const wide = CARDS.filter((c) => c.size === "wide");

  return (
    <section className="w-full flex md:px-10 pt-28 md:pt-36 pb-16 gap-[20px] skills-section-wrapper">
      {/* flex+justify-center centers this reliably regardless of what the
          parent layout is doing — more robust than relying on mx-auto */}
      <div className="w-full max-w-5xl">
        <div className="log-badge">
          <span className="log-dot" />
          <span className="log-label">Log Entry 02</span>
        </div>

        <h2 className="about-title hero-title">Core capabilities</h2>
        <p className="text-zinc-500 text-base md:text-lg mb-10 md:mb-12">How I engineer software.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex justify-center skills-grid">
          <Card card={tall} />
          <div className="grid grid-cols-1 gap-4 ">
            {small.map((c) => (
              <Card key={c.id} card={c} />
            ))}
          </div>
        </div>

       

        <div className="grid grid-cols-1 gap-4 skills-grid-wide">
          {wide.map((c) => (
            <Card key={c.id} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}