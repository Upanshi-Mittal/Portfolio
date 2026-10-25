import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { ChevronDown, ChevronUp, GitMerge, Loader2 } from "lucide-react";

// Pre-seeded with Upanshi's 100% real GitHub PR data for instant load & offline resilience
const SEEDED_CONTRIBUTIONS = [
  {
    id: 5294380300,
    number: 1682,
    title: "fix(viz): display source filenames for synthetic module nodes",
    repo: "CodeGraphContext/CodeGraphContext",
    orgName: "CodeGraphContext",
    url: "https://github.com/CodeGraphContext/CodeGraphContext/pull/1682",
    additions: 388,
    deletions: 9,
    date: "Sep 2",
    merged: true,
  },
  {
    id: 4913878996,
    number: 1,
    title: "V2 — Architecture upgrade & generative scene overhaul",
    repo: "Upanshi-Mittal/Paperplane",
    orgName: "Paperplane",
    url: "https://github.com/Upanshi-Mittal/Paperplane/pull/1",
    additions: 4287,
    deletions: 17656,
    date: "Jul 17",
    merged: true,
  },
  {
    id: 3789742691,
    number: 3524,
    title: "[lint] Disable pylint rule suggesting removal of explicit else blocks",
    repo: "augurlabs/augur",
    orgName: "augurlabs",
    url: "https://github.com/augurlabs/augur/pull/3524",
    additions: 5,
    deletions: 0,
    date: "Jan 9",
    merged: true,
  },
  {
    id: 3786590898,
    number: 3296,
    title: "fix: add API key name label in onboarding",
    repo: "daytonaio/daytona",
    orgName: "daytonaio",
    url: "https://github.com/daytonaio/daytona/pull/3296",
    additions: 16,
    deletions: 10,
    date: "Jan 13",
    merged: true,
  },
  {
    id: 3785548792,
    number: 3195,
    title: "Add SCHOOL category and subdivision hooks for Belgium",
    repo: "vacanza/holidays",
    orgName: "vacanza",
    url: "https://github.com/vacanza/holidays/pull/3195",
    additions: 559,
    deletions: 6,
    date: "Oct 5",
    merged: true,
  },
  {
    id: 3622156740,
    number: 5,
    title: "using murf as tts api",
    repo: "Callarity-Tech/callarity-frontend",
    orgName: "Callarity-Tech",
    url: "https://github.com/Callarity-Tech/callarity-frontend/pull/5",
    additions: 42,
    deletions: 8,
    date: "Nov 14",
    merged: true,
  },
  {
    id: 3605234689,
    number: 4,
    title: "Improve STT accuracy and fix sentence cutoff during speech detection",
    repo: "Callarity-Tech/callarity-backend",
    orgName: "Callarity-Tech",
    url: "https://github.com/Callarity-Tech/callarity-backend/pull/4",
    additions: 135,
    deletions: 24,
    date: "Nov 11",
    merged: true,
  },
  {
    id: 3562490909,
    number: 2,
    title: "conversation logging system added",
    repo: "Callarity-Tech/callarity-backend",
    orgName: "Callarity-Tech",
    url: "https://github.com/Callarity-Tech/callarity-backend/pull/2",
    additions: 168,
    deletions: 15,
    date: "Oct 31",
    merged: true,
  },
  {
    id: 3542658402,
    number: 1,
    title: "Add Speech-To-Text transcription service",
    repo: "Callarity-Tech/callarity-backend",
    orgName: "Callarity-Tech",
    url: "https://github.com/Callarity-Tech/callarity-backend/pull/1",
    additions: 240,
    deletions: 35,
    date: "Oct 23",
    merged: true,
  },
  {
    id: 3442273158,
    number: 67,
    title: "Enhance index links, add loading screen, fix about page text and added guide",
    repo: "osdc/git-orientation",
    orgName: "osdc",
    url: "https://github.com/osdc/git-orientation/pull/67",
    additions: 145,
    deletions: 18,
    date: "Sep 22",
    merged: true,
  },
  {
    id: 3438201895,
    number: 65,
    title: "Intro page — Visual presentation & styling upgrades",
    repo: "osdc/git-orientation",
    orgName: "osdc",
    url: "https://github.com/osdc/git-orientation/pull/65",
    additions: 82,
    deletions: 12,
    date: "Sep 22",
    merged: true,
  },
  {
    id: 3429976406,
    number: 34,
    title: "Added About-page — Open source & GitHub guidance",
    repo: "osdc/git-orientation",
    orgName: "osdc",
    url: "https://github.com/osdc/git-orientation/pull/34",
    additions: 190,
    deletions: 15,
    date: "Sep 20",
    merged: true,
  },
  {
    id: 3415382288,
    number: 27,
    title: "add home-page — Zodiac themed interactive landing",
    repo: "osdc/git-orientation",
    orgName: "osdc",
    url: "https://github.com/osdc/git-orientation/pull/27",
    additions: 215,
    deletions: 10,
    date: "Sep 14",
    merged: true,
  },
  {
    id: 2545360823,
    number: 102,
    title: "Pikachu interactive creature component",
    repo: "osdc/pokedc",
    orgName: "osdc",
    url: "https://github.com/osdc/pokedc/pull/102",
    additions: 38,
    deletions: 2,
    date: "Sep 24",
    merged: true,
  },
];

export default function OpenSource() {
  const [prs, setPrs] = useState(SEEDED_CONTRIBUTIONS);
  const [mergedCount, setMergedCount] = useState(
    SEEDED_CONTRIBUTIONS.filter((p) => p.merged).length
  );
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const INITIAL_COUNT = 5;

  const GITHUB_USERNAME = "Upanshi-Mittal";

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const day = d.getDate();
    return `${month} ${day}`;
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveContributions() {
      try {
        setLoading(true);

        const CACHE_KEY = `gh_contributions_${GITHUB_USERNAME}`;
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
              if (isMounted && parsed.data?.length > 0) {
                setPrs(parsed.data);
                setMergedCount(parsed.mergedCount);
                setLoading(false);
                return;
              }
            }
          } catch {
            // ignore
          }
        }

        const res = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&sort=created&order=desc&per_page=30`
        );

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();
        const items = data.items || [];

        if (items.length === 0) {
          if (isMounted) setLoading(false);
          return;
        }

        // Map live items and merge with seeded additions/deletions if available
        const livePrs = items.map((item) => {
          const repoParts = item.repository_url.split("/");
          const repoName = repoParts.slice(-2).join("/");
          const orgName = repoParts[repoParts.length - 2];
          const isMerged =
            Boolean(item.pull_request?.merged_at) || item.state === "closed";

          const seededMatch = SEEDED_CONTRIBUTIONS.find(
            (s) => s.id === item.id || s.number === item.number && s.repo === repoName
          );

          return {
            id: item.id,
            number: item.number,
            title: item.title,
            repo: repoName,
            orgName: orgName,
            url: item.html_url,
            rawPullUrl: item.pull_request?.url,
            additions: seededMatch ? seededMatch.additions : null,
            deletions: seededMatch ? seededMatch.deletions : null,
            date: formatDate(item.closed_at || item.created_at),
            merged: isMerged,
          };
        });

        const totalMerged = livePrs.filter((p) => p.merged).length;

        if (isMounted) {
          setPrs(livePrs);
          setMergedCount(totalMerged);
          setLoading(false);

          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: livePrs,
              mergedCount: totalMerged,
              timestamp: Date.now(),
            })
          );
        }
      } catch (err) {
        console.warn("Using seeded contributions:", err);
        if (isMounted) setLoading(false);
      }
    }

    fetchLiveContributions();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter out self-username & generic portfolio names from the "Shipped into..." strip
  const uniqueOrgs = Array.from(
    new Set(
      prs
        .map((p) => p.orgName)
        .filter(
          (org) =>
            org &&
            org.toLowerCase() !== GITHUB_USERNAME.toLowerCase() &&
            org.toLowerCase() !== "portfolio"
        )
    )
  );

  const visibleContributions = expanded ? prs : prs.slice(0, INITIAL_COUNT);

  return (
    <section className="w-full py-16 px-4 sm:px-8 md:px-12 my-6" id="opensource">
      {/* ── 1. Top Section Header: "open source / X merged" ── */}
      <div className="flex items-center gap-2.5 font-mono text-sm tracking-wide text-zinc-400 mb-5 select-none">
        <span className="text-zinc-300 font-medium">open source</span>
        <span className="text-zinc-600 font-light">/</span>
        <span className="text-zinc-400 font-normal">{mergedCount} merged</span>
        {loading && (
          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 ml-3">
            <Loader2 size={12} className="animate-spin text-zinc-400" />
            <span>syncing...</span>
          </span>
        )}
      </div>

      {/* ── 2. Overlapping Org Avatars & "Shipped into..." strip ── */}
      <div className="flex flex-wrap items-center gap-3.5 mb-7">
        <div className="flex -space-x-2.5 overflow-hidden items-center py-1">
          {uniqueOrgs.slice(0, 8).map((org, index) => (
            <div
              key={index}
              title={org}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs border-2 border-[#090d12] shadow-sm flex-shrink-0 bg-zinc-800 overflow-hidden transition-transform hover:scale-115 hover:z-20 cursor-pointer"
            >
              <img
                src={`https://github.com/${org}.png?size=64`}
                alt={org}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.textContent = org.slice(0, 1).toUpperCase();
                }}
              />
            </div>
          ))}
        </div>

        <p className="font-sans text-sm text-zinc-400 m-0 leading-normal">
          Shipped into{" "}
          {uniqueOrgs.slice(0, 3).map((org, i) => (
            <React.Fragment key={org}>
              <strong className="text-zinc-200 font-medium">{org}</strong>
              {i < Math.min(uniqueOrgs.length, 3) - 1 ? ", " : ""}
            </React.Fragment>
          ))}
          {uniqueOrgs.length > 3 && (
            <span className="text-zinc-400 font-normal">
              {" "}and {uniqueOrgs.length - 3} more
            </span>
          )}
        </p>
      </div>

      {/* ── 3. Main Contributions Card ── */}
      <div className="relative rounded-[26px] border border-zinc-800/80 bg-[#0d1117]/90 backdrop-blur-xl shadow-2xl p-2.5 sm:p-3.5 overflow-hidden">
        <div className="flex flex-col">
          {visibleContributions.map((item, idx) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between gap-3.5 sm:gap-5 py-3.5 sm:py-4 px-3 sm:px-5 rounded-2xl hover:bg-white/[0.04] transition-all duration-200 no-underline min-h-[66px] sm:min-h-[70px] ${
                idx !== visibleContributions.length - 1
                  ? "border-b border-zinc-800/40"
                  : ""
              }`}
            >
              {/* Left Logo / Org Avatar */}
              <div className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm group-hover:scale-105 group-hover:border-white/20 transition-all duration-200">
                <img
                  src={`https://github.com/${item.orgName}.png?size=96`}
                  alt={item.orgName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = "none";
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = "flex";
                    }
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center font-mono font-bold text-xs text-zinc-300 uppercase bg-zinc-800">
                  {item.orgName ? item.orgName.slice(0, 2) : "PR"}
                </div>
              </div>

              {/* Middle: Title & Repo details */}
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 pr-2">
                <div className="text-sm sm:text-[15px] font-normal text-zinc-100 group-hover:text-white transition-colors truncate leading-tight">
                  {item.title}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs sm:text-[13px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                    {item.repo}
                  </span>

                  {item.additions !== null && item.additions !== undefined ? (
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <span className="text-emerald-400 font-medium">
                        +{item.additions}
                      </span>
                      <span className="text-rose-400 font-medium">
                        -{item.deletions}
                      </span>
                    </div>
                  ) : item.merged ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                      <GitMerge size={10} className="text-purple-400" /> merged
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Right: Date */}
              <div className="font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors flex-shrink-0 text-right min-w-[55px]">
                {item.date}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── 4. Footer: "Show all X" button / GitHub Profile Link ── */}
      <div className="mt-5 flex items-center justify-between px-3 sm:px-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-3.5 py-1.5 rounded-xl cursor-pointer transition-all duration-150"
        >
          <span>{expanded ? "Show less" : `Show all ${prs.length}`}</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <a
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors no-underline group"
        >
          <FaGithub size={14} className="group-hover:text-white transition-colors" />
          <span>github.com/{GITHUB_USERNAME}</span>
        </a>
      </div>
    </section>
  );
}
