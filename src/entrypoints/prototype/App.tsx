import { useState } from "react";
import { ChatScreen } from "@/prototype/components/ChatScreen";

export default function App() {
  const [replayToken, setReplayToken] = useState(0);

  return (
    <main className="wa-stage">
      <a className="wa-home" href="/">
        Both prototypes
      </a>
      <div className="wa-phone">
        <ChatScreen key={replayToken} replayToken={replayToken} />
      </div>
      <button type="button" className="wa-replay" onClick={() => setReplayToken((n) => n + 1)}>
        Replay opening
      </button>
    </main>
  );
}
