export function TypingIndicator() {
  return (
    <div className="wa-row wa-row-in" aria-hidden="false">
      <div className="wa-bubble wa-bubble-in wa-typing" role="status" aria-label="Check this is typing">
        <span className="wa-dot" />
        <span className="wa-dot" />
        <span className="wa-dot" />
      </div>
    </div>
  );
}
