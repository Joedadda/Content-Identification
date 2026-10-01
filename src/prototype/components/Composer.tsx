export function Composer({ onPreview }: { onPreview: () => void }) {
  return (
    <form
      className="wa-composer"
      onSubmit={(event) => {
        event.preventDefault();
        onPreview();
      }}
    >
      <button type="button" className="wa-icon-btn" aria-label="Attach" onClick={onPreview}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path
            d="M8.2 12.4l6.4-6.4a3.2 3.2 0 014.5 4.5l-7.6 7.6a4.6 4.6 0 01-6.5-6.5l7-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <input
        className="wa-input"
        readOnly
        placeholder="Message"
        aria-label="Message. This is a prototype preview and does not send."
        onClick={onPreview}
        onFocus={onPreview}
      />
      <button type="button" className="wa-icon-btn" aria-label="Camera" onClick={onPreview}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path
            d="M4 8.5h3l1.4-2h7.2L17 8.5h3v9.2a1.6 1.6 0 01-1.6 1.6H5.6A1.6 1.6 0 014 17.7V8.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="13" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </button>
      <button type="submit" className="wa-send" aria-label="Send">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M3.5 11.2L20 4.5l-6.2 15.2-2.6-6.1-7.7-2.4z" fill="currentColor" />
        </svg>
      </button>
    </form>
  );
}
