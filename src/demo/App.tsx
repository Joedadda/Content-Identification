import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { posts, type Phase, type Post } from "./data";
import { Feed } from "./Feed";
import { Panel } from "./Panel";

const CHECK_MS = 1100;

function readSelection() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("media");
  const post = posts.find((item) => item.id === id && item.media) ?? null;
  return {
    post,
    open: params.get("why") === "1" && post != null,
  };
}

function writeSelection(post: Post | null, open: boolean) {
  const url = new URL(window.location.href);
  if (post) url.searchParams.set("media", post.id);
  else url.searchParams.delete("media");
  if (open && post) url.searchParams.set("why", "1");
  else url.searchParams.delete("why");
  window.history.replaceState(null, "", url);
}

export default function App() {
  const reducedMotion = useReducedMotion() ?? false;
  const initial = readSelection();
  const [selected, setSelected] = useState<Post | null>(initial.post);
  const [phase, setPhase] = useState<Phase>(initial.post ? "ready" : "idle");
  const [whyOpen, setWhyOpen] = useState(initial.open);

  useEffect(() => {
    if (!selected) return;
    if (phase !== "checking") return;
    const timer = window.setTimeout(() => setPhase("ready"), CHECK_MS);
    return () => window.clearTimeout(timer);
  }, [selected, phase]);

  function select(post: Post) {
    if (selected?.id === post.id && phase === "ready") {
      setSelected(null);
      setPhase("idle");
      setWhyOpen(false);
      writeSelection(null, false);
      return;
    }
    setSelected(post);
    setPhase("checking");
    setWhyOpen(false);
    writeSelection(post, false);
  }

  function setOpen(open: boolean) {
    setWhyOpen(open);
    writeSelection(selected, open);
  }

  function clear() {
    setSelected(null);
    setPhase("idle");
    setWhyOpen(false);
    writeSelection(null, false);
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f4f1ea] text-[#1c1917] [touch-action:manipulation]">
      <a
        href="#feed"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to feed
      </a>
      <header className="flex h-11 shrink-0 items-center gap-3 border-b border-[#e4ddd0] bg-[#ebe6dc] px-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#c47a6a]" />
          <span className="size-2.5 rounded-full bg-[#d2b15e]" />
          <span className="size-2.5 rounded-full bg-[#7ea37a]" />
        </div>
        <div className="mx-auto flex h-7 w-full max-w-md items-center justify-center rounded-full bg-white/80 px-3 text-xs text-[#6f675c]">
          <span translate="no">social.example/home</span>
        </div>
        <a
          href="/"
          className="shrink-0 text-[11px] font-semibold tracking-wide text-[#3f4f46] underline decoration-[#c4b8a4] underline-offset-2"
        >
          Both prototypes
        </a>
      </header>
      <div className="flex min-h-0 flex-1">
        <Feed
          posts={posts}
          selectedId={selected?.id ?? null}
          reducedMotion={reducedMotion}
          onSelect={select}
        />
        <Panel
          post={selected}
          phase={phase}
          whyOpen={whyOpen}
          reducedMotion={reducedMotion}
          onToggleWhy={() => setOpen(!whyOpen)}
          onClear={clear}
        />
      </div>
    </div>
  );
}
