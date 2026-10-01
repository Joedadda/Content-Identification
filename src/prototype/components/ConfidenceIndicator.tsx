import type { ConfidenceLevel } from "../types";

const label: Record<ConfidenceLevel, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const filled: Record<ConfidenceLevel, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function ConfidenceIndicator({ level }: { level: ConfidenceLevel }) {
  const count = filled[level];
  return (
    <p className={`wa-confidence wa-confidence-${level}`}>
      <span className="wa-bars" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <span key={index} className={index < count ? "is-on" : "is-off"} />
        ))}
      </span>
      <span>
        Confidence: <strong>{label[level]}</strong>
      </span>
    </p>
  );
}
