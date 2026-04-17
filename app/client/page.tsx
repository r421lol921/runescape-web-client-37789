export default function ClientPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PeytOtoria Client</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              * { margin: 0; padding: 0; box-sizing: border-box; }
              html, body {
                width: 100%; height: 100%;
                background: #1a1a1a;
                color: #f0ede8;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .container {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
                padding: 32px;
              }
              .icon {
                width: 64px; height: 64px;
                background: #242424;
                border: 1px solid #3a3a3a;
                border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                font-size: 32px;
              }
              h1 { font-size: 18px; font-weight: 700; color: #c8a96e; }
              p { font-size: 13px; color: #8a8480; max-width: 280px; line-height: 1.6; }
              .badge {
                display: inline-flex; align-items: center; gap: 6px;
                font-size: 11px; color: #5cb85c;
                background: rgba(92,184,92,0.1);
                border: 1px solid rgba(92,184,92,0.2);
                border-radius: 999px; padding: 4px 10px;
              }
              .dot {
                width: 6px; height: 6px;
                border-radius: 50%; background: #5cb85c;
                animation: pulse 2s infinite;
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="icon">&#x2694;&#xfe0f;</div>
          <h1>PeytOtoria Game Client</h1>
          <div className="badge">
            <div className="dot" />
            Game client coming soon
          </div>
          <p>
            The browser game client is built separately with Parcel and served here.
            Run <code style={{ background: "#2e2e2e", padding: "2px 6px", borderRadius: 4 }}>npm run dev-parcel</code> to start the game client locally.
          </p>
        </div>
      </body>
    </html>
  );
}
