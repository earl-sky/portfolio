import { useEffect, useRef } from 'react';

const TRADINGVIEW_SCRIPT = 'https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js';
const TICKER_SYMBOLS = 'FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD';

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
    ticker.setAttribute('direction', 'horizontal');
    ticker.setAttribute('hide-chart', '');
    ticker.setAttribute('item-size', 'compact');
    ticker.setAttribute('aria-label', 'TradingView market ticker');
    container.replaceChildren(ticker);

    return () => ticker.remove();
  }, []);

  return (
    <section className="market-ticker-rail" aria-label="Market ticker">
      <div className="market-ticker-inner">
        <div className="market-ticker-widget" ref={containerRef} />
      </div>
    </section>
  );
}
