import { useEffect, useState } from "react";

const API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

const css = `
  body { margin: 0; background: #0f1b1a; color: #e8f0ee; font-family: system-ui, sans-serif; }
  .wrap { max-width: 900px; margin: 0 auto; padding: 32px 16px; }
  h1 { font-size: 1.6rem; margin: 0 0 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .card { border: 1px solid #2d4744; border-radius: 8px; padding: 14px; background: #162826; }
  .name { font-weight: 600; margin: 0 0 6px; }
  .price { margin: 0; font-size: 1.15rem; color: #3ddc97; font-variant-numeric: tabular-nums; }
  .msg { color: #8aa5a0; }
`;

export default function App() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then(setCoins)
      .catch((e) => setError(e.message + ". Wait a minute and refresh the page."));
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <h1>Cryptocurrency prices (USD)</h1>
        {error && <p className="msg">{error}</p>}
        {!error && coins.length === 0 && <p className="msg">Loading...</p>}
        <div className="grid">
          {coins.map((c) => (
            <div className="card" key={c.id}>
              <p className="name">{c.name}</p>
              <p className="price">
                ${c.current_price.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}