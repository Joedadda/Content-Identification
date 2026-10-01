import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ResultModel } from "../types";
import { ConfidenceIndicator } from "./ConfidenceIndicator";

const ease = [0.16, 1, 0.3, 1] as const;

export function ResultCard({ result }: { result: ResultModel }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"closed" | "typing" | "open">("closed");
  const [choice, setChoice] = useState<string | null>(null);
  const [disputed, setDisputed] = useState<"no" | "wait" | "yes">("no");
  const timer = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const disputeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "open" && disputed !== "yes") return;
    const timer = window.setTimeout(() => {
      const target = disputed === "yes" ? disputeRef.current : panelRef.current;
      target?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "end",
      });
    }, reduce ? 0 : 380);
    return () => window.clearTimeout(timer);
  }, [phase, choice, disputed, reduce]);

  function toggleWhy() {
    if (timer.current) window.clearTimeout(timer.current);
    if (phase === "open" || phase === "typing") {
      setPhase("closed");
      return;
    }
    if (reduce) {
      setPhase("open");
      return;
    }
    setPhase("typing");
    timer.current = window.setTimeout(() => setPhase("open"), 800);
  }

  function choose(id: string, scrollTo?: string) {
    setChoice(id);
    if (!scrollTo) return;
    window.setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    }, 280);
  }

  function dispute() {
    if (disputed !== "no") return;
    if (reduce) {
      setDisputed("yes");
      return;
    }
    setDisputed("wait");
    window.setTimeout(() => setDisputed("yes"), 700);
  }

  const chosen = result.actions?.find((action) => action.id === choice);

  return (
    <div className="wa-row wa-row-in">
      <article className={`wa-bubble wa-bubble-in wa-result wa-tone-${result.tone}`}>
        <p className="wa-chip">
          <StateIcon tone={result.tone} />
          <span>{result.chip}</span>
        </p>
        <h2 className="wa-verdict">
          <span aria-hidden="true">{result.emoji}</span> {result.verdict}
        </h2>
        <p className="wa-body">{result.explanation}</p>
        <ConfidenceIndicator level={result.confidence} />
        <p className="wa-body wa-next">{result.recommendation}</p>

        <button
          type="button"
          className={`wa-why${result.emphasizeWhy && phase === "closed" ? " is-emphasis" : ""}`}
          aria-expanded={phase !== "closed"}
          onClick={toggleWhy}
        >
          <span>Why do you say this?</span>
          <Chevron open={phase !== "closed"} />
        </button>

        <AnimatePresence initial={false}>
          {phase !== "closed" && (
            <motion.div
              key="why"
              ref={panelRef}
              className="wa-expand"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.36, ease }}
            >
              <div className="wa-expand-inner">
                {phase === "typing" && (
                  <div className="wa-inline-typing" role="status" aria-label="Check this is typing">
                    <span className="wa-dot" />
                    <span className="wa-dot" />
                    <span className="wa-dot" />
                  </div>
                )}
                {phase === "open" && (
                  <div>
                    <p className="wa-evidence-title">{result.evidence.title}</p>
                    <ul className="wa-points">
                      {result.evidence.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <p className="wa-body">{result.evidence.closing}</p>
                    <ConfidenceIndicator level={result.confidence} />
                    {result.actions && (
                      <div className="wa-decide">
                        <p className="wa-evidence-title">What would you like to do?</p>
                        <div className="wa-actions">
                          {result.actions.map((action, index) => (
                            <button
                              key={action.id}
                              type="button"
                              className={`wa-action${index === 0 ? " is-primary" : ""}${choice === action.id ? " is-selected" : ""}`}
                              aria-pressed={choice === action.id}
                              disabled={choice !== null && choice !== action.id}
                              onClick={() => choose(action.id, action.scrollTo)}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                        {chosen && <p className="wa-reply">{chosen.reply}</p>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {result.dispute && (
          <div className="wa-dispute">
            {disputed === "no" && (
              <button type="button" className="wa-text-btn" onClick={dispute}>
                {result.dispute.label}
              </button>
            )}
            {disputed === "wait" && (
              <div className="wa-inline-typing" role="status" aria-label="Check this is typing">
                <span className="wa-dot" />
                <span className="wa-dot" />
                <span className="wa-dot" />
              </div>
            )}
            {disputed === "yes" && (
              <p className="wa-reply" ref={disputeRef}>
                {result.dispute.reply}
              </p>
            )}
          </div>
        )}

        <div className="wa-meta">
          <time dateTime={result.time}>{result.time}</time>
        </div>
      </article>
    </div>
  );
}

function StateIcon({ tone }: { tone: ResultModel["tone"] }) {
  if (tone === "good") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (tone === "unsure") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M9.2 9.3a2.8 2.8 0 115.1 1.6c-.7.8-1.5 1.2-1.8 2" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12.4" cy="16.6" r="1" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 3.2l9 16.2H3L12 3.2z" fill="currentColor" />
      <path d="M12 9v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.6" r="1" fill="#fff" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`wa-chevron${open ? " is-open" : ""}`}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
