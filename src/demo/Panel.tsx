import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Phase, Post } from "./data";
import { Scene } from "./scenes";

const ease = [0.16, 1, 0.3, 1] as const;

type PanelProps = {
  post: Post | null;
  phase: Phase;
  whyOpen: boolean;
  reducedMotion: boolean;
  onToggleWhy: () => void;
  onClear: () => void;
};

export function Panel({
  post,
  phase,
  whyOpen,
  reducedMotion,
  onToggleWhy,
  onClear,
}: PanelProps) {
  const media = post?.media;
  const result = post?.result;
  const noun = media?.kind === "video" ? "video" : "image";

  return (
    <aside
      aria-label="Verify"
      className="verify-panel flex w-[24vw] min-w-[300px] max-w-[400px] shrink-0 flex-col border-l border-border bg-white text-foreground"
    >
      <div className="flex items-baseline justify-between px-4 pt-4 pb-3">
        <p className="text-[15px] font-semibold tracking-tight">Verify</p>
        <p className="text-xs text-muted-foreground">On this page</p>
      </div>
      <ScrollArea className="min-h-0 flex-1 overscroll-contain">
        <div className="flex flex-col gap-4 px-4 pb-6" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "idle" || !post || !media ? (
              <motion.div
                key="idle"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease }}
              >
                <Waiting reducedMotion={reducedMotion} />
              </motion.div>
            ) : (
              <motion.div
                key={post.id}
                initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col gap-4"
              >
                <figure className="relative overflow-hidden rounded-xl border border-border">
                  <Scene id={post.id} reducedMotion={reducedMotion} className="aspect-video" />
                  {phase === "checking" && !reducedMotion ? (
                    <BorderBeam
                      size={72}
                      duration={3.2}
                      borderWidth={1.5}
                      colorFrom="#93c5fd"
                      colorTo="#2563eb"
                    />
                  ) : null}
                  <figcaption className="sr-only">{media.alt}</figcaption>
                </figure>
                {phase === "checking" || !result ? (
                  <div>
                    <h2 className="text-xl leading-snug text-balance">
                      Checking this {noun}…
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Analyzing available signals
                    </p>
                  </div>
                ) : (
                  <ResultBody
                    post={post}
                    whyOpen={whyOpen}
                    reducedMotion={reducedMotion}
                    onToggleWhy={onToggleWhy}
                    onClear={onClear}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </aside>
  );
}

function Waiting({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pt-6">
      <motion.div
        aria-hidden="true"
        className="mb-5 text-primary"
        animate={reducedMotion ? undefined : { x: [0, -6, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ArrowLeft className="size-5" />
      </motion.div>
      <h2 className="text-xl leading-snug text-balance">
        Check something you’re seeing
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Hover an image or video on the page, then click it. Nothing needs to be copied or uploaded.
      </p>
    </div>
  );
}

function ResultBody({
  post,
  whyOpen,
  reducedMotion,
  onToggleWhy,
  onClear,
}: {
  post: Post;
  whyOpen: boolean;
  reducedMotion: boolean;
  onToggleWhy: () => void;
  onClear: () => void;
}) {
  const result = post.result!;
  return (
    <div>
      <h2 className="text-xl leading-snug text-balance">{result.verdict}</h2>
      <p className="mt-2 text-sm leading-relaxed text-pretty">{result.summary}</p>
      <h3 className="mt-4 text-sm text-muted-foreground">
        Why this reading
      </h3>
      <ul className="mt-2 flex flex-col gap-2 text-sm leading-snug">
        {result.why.map((item) => (
          <li key={item} className="border-l-2 border-blue-600 pl-3">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <span className="text-muted-foreground">Evidence strength. </span>
        {result.strength}
      </p>
      <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-sm leading-relaxed text-pretty text-muted-foreground">
        {result.limitation}
      </p>
      <div className="mt-4">
        <p className="text-sm font-medium">{result.nextLabel}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{result.nextDetail}</p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button type="button" onClick={onToggleWhy} aria-expanded={whyOpen}>
          {whyOpen ? "Hide the Detail" : "See Why"}
          <ChevronDown
            aria-hidden="true"
            className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${whyOpen ? "rotate-180" : ""}`}
          />
        </Button>
        <AnimatePresence initial={false}>
          {whyOpen ? (
            <motion.div
              key="why"
              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-1">
                {result.investigation.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {item.available ? item.body : `Not available. ${item.body}`}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <Button
          type="button"
          variant="outline"
          className="border-blue-600 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
          onClick={onClear}
        >
          Check Something Else
        </Button>
      </div>
    </div>
  );
}
