import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { FINAL_STEP } from "./conversation";

type TimelineEvent = {
  at: number;
  step?: number;
  typing?: string | null;
};

const timeline: TimelineEvent[] = [
  { at: 650, step: 1 },
  { at: 1150, typing: "video" },
  { at: 2500, typing: null, step: 2 },
  { at: 3100, step: FINAL_STEP },
];

export function usePlayback(replayToken: number) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [typingAfter, setTypingAfter] = useState<string | null>(null);

  useEffect(() => {
    if (reduce === null) return;
    if (reduce) {
      setStep(FINAL_STEP);
      setTypingAfter(null);
      return;
    }

    setStep(0);
    setTypingAfter(null);
    let cancelled = false;
    const timers: number[] = [];

    for (const event of timeline) {
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          if (event.typing !== undefined) setTypingAfter(event.typing);
          if (event.step !== undefined) {
            setStep((current) => Math.max(current, event.step ?? current));
          }
        }, event.at),
      );
    }

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
    };
  }, [reduce, replayToken]);

  return { step, typingAfter, setStep };
};
