import { motion, useReducedMotion } from "motion/react";
import type { ChatItem } from "../types";
import { MediaArt } from "./MediaArt";
import { ResultCard } from "./ResultCard";

const ease = [0.16, 1, 0.3, 1] as const;

export function MessageView({ item }: { item: ChatItem }) {
  const reduce = useReducedMotion();
  const body = (() => {
    switch (item.type) {
      case "assistant":
        return (
          <div className="wa-row wa-row-in">
            <div className="wa-bubble wa-bubble-in">
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className="wa-body">
                  {paragraph}
                </p>
              ))}
              <Meta time={item.time} />
            </div>
          </div>
        );
      case "video":
        return (
          <div className="wa-row wa-row-out">
            <div className="wa-bubble wa-bubble-out wa-media-bubble">
              {item.forwarded && (
                <p className="wa-forwarded">
                  <ForwardIcon /> Forwarded
                </p>
              )}
              <MediaArt
                kind="speech"
                duration={item.duration}
                alt="Video thumbnail. A person speaking into a microphone in a hall. 42 seconds."
              />
              <p className="wa-body">{item.caption}</p>
              <Meta time={item.time} outgoing />
            </div>
          </div>
        );
      case "image":
        return (
          <div className="wa-row wa-row-out" id={`msg-${item.id}`}>
            <div className="wa-bubble wa-bubble-out wa-media-bubble">
              <MediaArt kind={item.thumb} alt={item.alt} />
              <p className="wa-body">{item.caption}</p>
              <Meta time={item.time} outgoing />
            </div>
          </div>
        );
      case "link":
        return (
          <div className="wa-row wa-row-out">
            <div className="wa-bubble wa-bubble-out wa-media-bubble">
              <div className="wa-link-card">
                <MediaArt kind="link" alt="" />
                <div className="wa-link-copy">
                  <p className="wa-link-domain">{item.domain}</p>
                  <p className="wa-link-title">{item.title}</p>
                  <p className="wa-link-desc">{item.description}</p>
                </div>
              </div>
              <p className="wa-url">{item.url}</p>
              <p className="wa-body">{item.caption}</p>
              <Meta time={item.time} outgoing />
            </div>
          </div>
        );
      case "result":
        return <ResultCard result={item} />;
      default:
        return null;
    }
  })();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease }}
    >
      {body}
    </motion.div>
  );
}

function Meta({ time, outgoing = false }: { time: string; outgoing?: boolean }) {
  return (
    <div className="wa-meta">
      <time dateTime={time}>{time}</time>
      {outgoing && (
        <svg className="wa-ticks" viewBox="0 0 18 12" width="18" height="12" aria-label="Read">
          <path d="M1 6.2l3.2 3.2L11.2 1.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.2 6.2l3.2 3.2L16.4 1.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function ForwardIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M2 8h8M7 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
