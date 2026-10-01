export function ChatHeader({ onPreview }: { onPreview: () => void }) {
  return (
    <header className="wa-header">
      <button type="button" className="wa-header-btn" aria-label="Back" onClick={onPreview}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="wa-avatar" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="42" height="42">
          <circle cx="24" cy="24" r="24" fill="#e7f6ef" />
          <path d="M14 25.2l6.2 6.2L34.5 16.5" fill="none" stroke="#075e54" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="wa-header-id">
        <p className="wa-header-name">Check this</p>
        <p className="wa-header-status">online</p>
      </div>
      <button type="button" className="wa-header-btn" aria-label="Voice call" onClick={onPreview}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M7.2 4.8h2.4l1.2 3-1.6 1a12 12 0 005.9 5.9l1-1.6 3 1.2v2.4c0 .7-.6 1.4-1.4 1.4C10.2 18.1 5.9 13.8 5.8 6.2c0-.8.6-1.4 1.4-1.4z" fill="currentColor" />
        </svg>
      </button>
      <button type="button" className="wa-header-btn" aria-label="Video call" onClick={onPreview}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <rect x="3" y="7" width="12" height="10" rx="2" fill="currentColor" />
          <path d="M15 10.5l6-3v9l-6-3v-3z" fill="currentColor" />
        </svg>
      </button>
    </header>
  );
}
