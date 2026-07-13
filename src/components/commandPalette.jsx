import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Search,
  LayoutGrid,
  FolderGit2,
  CornerDownLeft,
  Settings2,
  Mail,
  SatelliteDish,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const RESUME_URL = ".././public/Upanshi_Mittal_resume.pdf"; // TODO: point this at your actual résumé file
const EMAIL_ADDRESS = "upanshimittal7@gmail.com"; // TODO: your real email

const DATA = [
  {
    group: "Navigation",
    items: [
      { id: "about", title: "About", subtitle: "~/mission/about", icon: LayoutGrid, shortcut: "G A", target: "#about", keywords: "about bio profile who" },
      { id: "capabilities", title: "Capability Map", subtitle: "~/mission/capabilities", icon: LayoutGrid, shortcut: "G C", target: "#skills", keywords: "skills capability map react tensorflow stack technologies skills skill" },
      { id: "projects", title: "Projects", subtitle: "~/mission/projects", icon: LayoutGrid, shortcut: "G P", target: "#projects", keywords: "projects work missions" },
      { id: "contact", title: "Open Transmission", subtitle: "~/mission/contact", icon: LayoutGrid, shortcut: "G T", target: "#contact", keywords: "contact transmission reach message form" },
    ],
  },
  {
    group: "Projects",
    items: [
      { id: "dreamscape", title: "Dreamscape", subtitle: "react · three.js · webgl", icon: FolderGit2, shortcut: "↵", target: "#dreamscape", keywords: "dreamscape react three webgl generative" },
      { id: "sentinelmesh", title: "SentinelMesh", subtitle: "go · distributed systems", icon: FolderGit2, shortcut: "↵", target: "#sentinelmesh", keywords: "sentinelmesh go distributed monitoring mesh" },
      { id: "intervue", title: "Intervue", subtitle: "react · node · llm interview tool", icon: FolderGit2, shortcut: "↵", target: "#intervue", keywords: "intervue react interview ai llm" },
      { id: "vision-sorter", title: "Vision Sorter", subtitle: "python · tensorflow · cv", icon: FolderGit2, shortcut: "↵", target: "#vision-sorter", keywords: "vision sorter tensorflow computer vision cv" },
      { id: "automl-dashboard", title: "AutoML Dashboard", subtitle: "python · tensorflow · react", icon: FolderGit2, shortcut: "↵", target: "#automl-dashboard", keywords: "automl dashboard tensorflow react ml" },
    ],
  },
  {
    group: "Actions",
    items: [
      { id: "resume", title: "Download Resume", subtitle: "pdf · updated jul 2026", icon: CornerDownLeft, shortcut: "R", action: "resume", keywords: "download resume cv pdf" },
      { id: "github", title: "Open GitHub", subtitle: "github.com", icon: FaGithub, shortcut: "G", action: "https://github.com/Upanshi-Mittal", keywords: "github code repos source" },
      { id: "linkedin", title: "Open LinkedIn", subtitle: "linkedin.com", icon: FaLinkedin, shortcut: "L", action: "https://www.linkedin.com/in/upanshi-mittal-498213320/?skipRedirect=true", keywords: "linkedin profile network" },
      { id: "email", title: "Copy Email", subtitle: "clipboard", icon: Mail, shortcut: "E", action: "email", keywords: "email copy contact mail" },
    ],
  },
  {
    group: "Settings",
    items: [
      { id: "toggle-index", title: "Toggle Mission Index", subtitle: "sidebar", icon: Settings2, shortcut: "M", action: "toggle-index", keywords: "toggle mission index sidebar" },
      { id: "toggle-motion", title: "Toggle Animations", subtitle: "motion", icon: Settings2, shortcut: "A", action: "toggle-motion", keywords: "toggle animations motion reduce" },
    ],
  },
];

const ALL_ITEMS = DATA.flatMap((g) => g.items);
const POPULAR_IDS = ["projects", "resume", "github", "contact"];
const TOTAL_COUNT = ALL_ITEMS.length;

function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent text-indigo-400 font-semibold">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}

function Row({ item, query, active, onHover, onSelect }) {
  const Icon = item.icon;
  return (
    <div
      onMouseEnter={onHover}
      onClick={onSelect}
      className={
        "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer border-l-2 transition-colors duration-100 " +
        (active
          ? "bg-zinc-900 border-indigo-500"
          : "border-transparent hover:bg-zinc-900/60")
      }
    >
      <div
        className={
          "w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md border " +
          (active
            ? "border-indigo-500/40 text-indigo-400 bg-indigo-500/10"
            : "border-zinc-800 text-zinc-500 bg-zinc-900")
        }
      >
        <Icon size={15} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-zinc-200 truncate">
          {highlight(item.title, query)}
        </div>
        <div className="text-xs font-mono text-zinc-600 truncate mt-0.5">
          {item.subtitle}
        </div>
      </div>
      <div
        className={
          "flex-shrink-0 text-xs font-mono px-2 py-1 rounded-md border " +
          (active
            ? "border-zinc-700 text-zinc-400"
            : "border-zinc-800 text-zinc-600")
        }
      >
        {item.shortcut}
      </div>
    </div>
  );
}

export default function MissionCommandPalette() {
  const [open, setOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState(["dreamscape", "capabilities", "projects"]);
  const [missionIndexOpen, setMissionIndexOpen] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [toast, setToast] = useState("");

  const inputRef = useRef(null);
  const listRef = useRef(null);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return DATA.map((g) => ({
      group: g.group,
      items: g.items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.subtitle.toLowerCase().includes(q) ||
          it.keywords.includes(q)
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const flatItems = useMemo(() => {
    if (grouped) return grouped.flatMap((g) => g.items);
    const recentItems = recent
      .map((id) => ALL_ITEMS.find((it) => it.id === id))
      .filter(Boolean);
    const popularItems = POPULAR_IDS
      .map((id) => ALL_ITEMS.find((it) => it.id === id))
      .filter(Boolean);
    return [...recentItems, ...popularItems];
  }, [grouped, recent]);

  const resultCount = grouped ? grouped.reduce((n, g) => n + g.items.length, 0) : null;

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
    requestAnimationFrame(() => setAnimateIn(true));
  }, []);

  const closePalette = useCallback(() => {
    setAnimateIn(false);
    setTimeout(() => setOpen(false), 160);
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }, []);

  const runAction = useCallback(
    (action) => {
      if (action.startsWith("http")) {
        window.open(action, "_blank", "noopener,noreferrer");
        return;
      }
      if (action === "resume") {
        const link = document.createElement("a");
        link.href = RESUME_URL;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        link.remove();
        return;
      }
      if (action === "email") {
        navigator.clipboard
          ?.writeText(EMAIL_ADDRESS)
          .then(() => showToast("Email copied to clipboard"))
          .catch(() => showToast(EMAIL_ADDRESS));
        return;
      }
    },
    [showToast]
  );

  const selectItem = useCallback(
    (item) => {
      setRecent((prev) => [item.id, ...prev.filter((id) => id !== item.id)].slice(0, 3));

      if (item.action === "toggle-index") {
        setMissionIndexOpen((prev) => {
          const next = !prev;
          window.dispatchEvent(new CustomEvent("mc:toggle-index", { detail: { open: next } }));
          showToast(`Mission index ${next ? "opened" : "closed"}`);
          return next;
        });
        closePalette();
        return;
      }
      if (item.action === "toggle-motion") {
        setAnimationsEnabled((prev) => {
          const next = !prev;
          document.documentElement.classList.toggle("reduce-motion", !next);
          showToast(`Animations ${next ? "enabled" : "reduced"}`);
          return next;
        });
        closePalette();
        return;
      }

      closePalette();
      setTimeout(() => {
        if (item.target) {
          document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (item.action) {
          runAction(item.action);
        }
      }, 160);
    },
    [closePalette, runAction, showToast]
  );

  useEffect(() => {
    function onKeyDown(e) {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        open ? closePalette() : openPalette();
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (flatItems.length ? (i + 1) % flatItems.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (flatItems.length ? (i - 1 + flatItems.length) % flatItems.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatItems[activeIndex]) selectItem(flatItems[activeIndex]);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, flatItems, activeIndex, openPalette, closePalette, selectItem]);

  useEffect(() => {
    const el = listRef.current?.children?.[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          .mc-palette { max-width: 740px; max-height: 62vh; }
        }
        .mc-results::-webkit-scrollbar { width: 8px; }
        .mc-results::-webkit-scrollbar-track { background: transparent; }
        .mc-results::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; border: 2px solid #09090b; }
        .mc-results::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
        .mc-results { scrollbar-width: thin; scrollbar-color: #27272a transparent; }
        .reduce-motion *, .reduce-motion *::before, .reduce-motion *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
      `}</style>

      {/* header trigger — desktop */}
      <button
        onClick={openPalette}
        style={{ height: "52px", width: "280px" }}
        className="hidden sm:flex items-center gap-2.5 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--secondary-text)] bg-red-500 hover:border-[var(--accent-blue)] hover:bg-[var(--secondary-surface)] transition-colors"
      >
        <Search size={16} className={"flex-shrink-0 "+ (open ?"opacity-0 ":"opacity-80" ) }/>
        <span className="flex-1 text-left text-sm text-zinc-600">Search mission files...</span>
        <span className="font-mono text-xs text-zinc-500 border border-zinc-700 bg-zinc-800 rounded-md px-1.5 py-0.5">
          ⌘K
        </span>
      </button>

      {/* header trigger — mobile */}
      <button
  onClick={openPalette}
  className="
    sm:hidden
    flex items-center justify-center
    w-11 h-11
    p-0
    rounded-xl
    border border-zinc-800
  "
>
  <Search className="w-5 h-5" />
</button>
{/*sm:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500  */}
      {/* toast for actions that don't navigate (copy email, toggles) */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] font-mono text-xs text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 shadow-2xl">
          {toast}
        </div>
      )}

      {/* overlay */}
      {open && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && closePalette()}
          className={
            "fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm pt-0 sm:pt-24 transition-opacity duration-150 " +
            (animateIn ? "opacity-100" : "opacity-0")
          }
        >
          <div
            className={
              "mc-palette w-full sm:mx-5 h-screen sm:h-auto bg-zinc-950 border border-zinc-800 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-150 ease-out " +
              (animateIn ? "scale-100 opacity-100" : "scale-95 opacity-0")
            }
          >
            {/* input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800 flex-shrink-0" style={{marginBottom:"10px"}}>
              <Search size={18} className="flex-shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Type a command or search..."
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none text-xl text-zinc-200 placeholder-zinc-600"
              />
              <span className="flex-shrink-0 font-mono text-xs text-zinc-500 border border-zinc-700 bg-zinc-900 rounded-md px-1.5 py-0.5">
                ESC
              </span>
            </div>

            {/* results */}
            <div className="mc-results overflow-y-auto p-2 flex-1">
              {grouped && resultCount === 0 ? (
                <div className="flex flex-col items-center justify-center text-center px-5 py-12 text-zinc-500">
                  <SatelliteDish size={40} strokeWidth={1.5} className="mb-4 opacity-50" />
                  <div className="text-sm font-medium text-zinc-200 mb-3">No mission found.</div>
                  <div className="text-xs text-zinc-600 mb-2.5">Try searching:</div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {["React", "Dreamscape", "Contact"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="font-mono text-xs text-zinc-400 border border-zinc-800 hover:border-indigo-500/60 hover:text-zinc-200 rounded-md px-2.5 py-1.5 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div ref={listRef}>
                  {!grouped && (
                    <>
                      {recent.length > 0 && (
                        <div className="mb-1">
                          <div className="px-3 pt-2.5 pb-1.5 font-mono text-xs uppercase tracking-wider text-zinc-600">
                            Recent
                          </div>
                          {recent.map((id) => {
                            const it = ALL_ITEMS.find((x) => x.id === id);
                            if (!it) return null;
                            const idx = flatItems.indexOf(it);
                            return (
                              <Row
                                key={it.id}
                                item={it}
                                query=""
                                active={idx === activeIndex}
                                onHover={() => setActiveIndex(idx)}
                                onSelect={() => selectItem(it)}
                              />
                            );
                          })}
                        </div>
                      )}
                      <div className="mb-1">
                        <div className="px-3 pt-2.5 pb-1.5 font-mono text-xs uppercase tracking-wider text-zinc-600">
                          Popular Commands
                        </div>
                        {POPULAR_IDS.map((id) => {
                          const it = ALL_ITEMS.find((x) => x.id === id);
                          if (!it) return null;
                          const idx = flatItems.indexOf(it);
                          return (
                            <Row
                              key={it.id}
                              item={it}
                              query=""
                              active={idx === activeIndex}
                              onHover={() => setActiveIndex(idx)}
                              onSelect={() => selectItem(it)}
                              
                            />
                          );
                        })}
                      </div>
                    </>
                  )}

                  {grouped &&
                    grouped.map((g) => (
                      <div key={g.group} className="mb-1">
                        <div className="px-3 pt-2.5 pb-1.5 font-mono text-xs uppercase tracking-wider text-zinc-600" >
                          {g.group}
                        </div>
                        {g.items.map((it) => {
                          const idx = flatItems.indexOf(it);
                          const displayItem =
                            it.id === "toggle-index"
                              ? { ...it, subtitle: `sidebar · ${missionIndexOpen ? "on" : "off"}` }
                              : it.id === "toggle-motion"
                              ? { ...it, subtitle: `motion · ${animationsEnabled ? "on" : "off"}` }
                              : it;
                          return (
                            <Row
                              key={it.id}
                              item={displayItem}
                              query={query}
                              active={idx === activeIndex}
                              onHover={() => setActiveIndex(idx)}
                              onSelect={() => selectItem(it)}
                              
                            />
                          );
                        })}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-800 flex-shrink-0 font-mono text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  {grouped ? `${resultCount} result${resultCount === 1 ? "" : "s"}` : `${TOTAL_COUNT} files indexed`}
                </span>
              </div>
              <div className="hidden sm:flex gap-3.5">
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono bg-zinc-900 border border-zinc-800 rounded px-1 py-0.5 text-zinc-500">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono bg-zinc-900 border border-zinc-800 rounded px-1 py-0.5 text-zinc-500">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono bg-zinc-900 border border-zinc-800 rounded px-1 py-0.5 text-zinc-500">esc</kbd> Close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}