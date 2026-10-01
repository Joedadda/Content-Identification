import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { conversation, OPENING_STEP } from "../conversation";
import { usePlayback } from "../usePlayback";
import { ChatHeader } from "./ChatHeader";
import { Composer } from "./Composer";
import { MessageView } from "./Messages";
import { PrototypeNotice } from "./PrototypeNotice";
import { TypingIndicator } from "./TypingIndicator";

export function ChatScreen({ replayToken }: { replayToken: number }) {
  const { step, typingAfter } = usePlayback(replayToken);
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState(false);
  const noticeTimer = useRef<number | null>(null);

  const visible = conversation.filter((item) => item.step <= step);

  useEffect(() => {
    if (step > OPENING_STEP) return;
    const node = scroller.current;
    if (!node) return;
    node.scrollTo({
      top: node.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [step, typingAfter, reduce, visible.length]);

  useEffect(() => {
    return () => {
      if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    };
  }, []);

  function showNotice() {
    setNotice(true);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(false), 6500);
  }

  return (
    <section className="wa-screen" aria-label="Chat with Check this">
      <h1 className="wa-sr">Check this. A chat for photos, videos and links you are unsure about.</h1>
      <div className="wa-status">
        <span>10:33</span>
        <span className="wa-status-icons" aria-hidden="true">
          <svg viewBox="0 0 18 12" width="16" height="12">
            <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
            <rect x="5" y="4" width="3" height="8" rx="0.5" fill="currentColor" />
            <rect x="10" y="1.5" width="3" height="10.5" rx="0.5" fill="currentColor" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.4" />
          </svg>
          <svg viewBox="0 0 16 12" width="15" height="12">
            <path d="M1 4.5C3.2 2.2 5.8 1 8 1s4.8 1.2 7 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M3.2 7C4.6 5.6 6.2 4.8 8 4.8S11.4 5.6 12.8 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="10" r="1.2" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 26 12" width="26" height="12">
            <rect x="0.6" y="0.6" width="21" height="10.8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2" y="2" width="15" height="8" rx="1" fill="currentColor" />
            <rect x="22.4" y="3.6" width="2" height="4.8" rx="0.6" fill="currentColor" />
          </svg>
        </span>
      </div>
      <ChatHeader onPreview={showNotice} />
      <div className="wa-thread" ref={scroller}>
        <div className="wa-wallpaper" aria-hidden="true" />
        <div className="wa-thread-inner">
          <p className="wa-day">Today</p>
          {visible.map((item) => (
            <div key={item.id}>
              <MessageView item={item} />
              {typingAfter === item.id && <TypingIndicator />}
            </div>
          ))}
        </div>
      </div>
      <PrototypeNotice open={notice} onClose={() => setNotice(false)} />
      <Composer onPreview={showNotice} />
    </section>
  );
}
