export default function Home() {
  return (
    <main className="home">
      <header className="home-intro">
        <p className="home-kicker">Check this</p>
        <h1>Two ways to look at a post.</h1>
        <p className="home-lead">
          Open the chat, or open the page where the extension sits beside the feed.
        </p>
      </header>
      <div className="home-choices">
        <a className="choice choice-chat" href="/whatsapp">
          <span className="choice-kicker">WhatsApp</span>
          <span className="choice-title">In the chat</span>
          <span className="choice-body">
            A phone conversation with the authenticity assistant.
          </span>
          <span className="choice-go">Open the chat</span>
        </a>
        <a className="choice choice-ext" href="/extension">
          <span className="choice-kicker">Browser extension</span>
          <span className="choice-title">On the page</span>
          <span className="choice-body">
            A feed you can select from, with the check beside it.
          </span>
          <span className="choice-go">Open the extension</span>
        </a>
      </div>
    </main>
  );
}
