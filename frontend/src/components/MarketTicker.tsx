import { useEffect, useRef } from 'react';

const TRADINGVIEW_SCRIPT = 'https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js';
const TICKER_SYMBOLS = 'FOREXCOM:SPXUSD,FOREXCOM:DJI,FOREXCOM:NSXUSD,FOREXCOM:US2000';

export default function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.querySelector('script[data-tradingview-ticker-tape]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = TRADINGVIEW_SCRIPT;
      script.dataset.tradingviewTickerTape = 'true';
      document.head.appendChild(script);
    }

    const ticker = document.createElement('tv-ticker-tape');
    ticker.setAttribute('symbols', TICKER_SYMBOLS);
    ticker.setAttribute('aria-label', 'TradingView market ticker');
    container.replaceChildren(ticker);

    return () => ticker.remove();
  }, []);

  return (
    <section className="market-ticker-rail" aria-label="Market ticker">
      <div className="market-ticker-inner">
        <div className="market-ticker-header">
          <div className="market-ticker-title"><span className="market-ticker-dot" aria-hidden="true" />US INDEX PROXIES</div>
          <span className="market-ticker-indices">SPX <i>·</i> DJIA <i>·</i> NASDAQ-100 <i>·</i> RUT</span>
        </div>
        <div className="market-ticker-widget" ref={containerRef} />
        <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/" target="_blank" rel="noopener nofollow">Ticker tape by TradingView</a></div>
        <p className="market-ticker-note">4 index feeds · NASDAQ-100 proxies IXIC; SPX, DJIA and RUT use CFD-style quotes · timing varies.</p>
      </div>
    </section>
  );
}
