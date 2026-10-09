import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  width?: number | string;
  height?: number;
  colorTheme?: 'light' | 'dark';
}

export function TradingViewSymbolOverview({
  symbol,
  width = '100%',
  height = 130,
  colorTheme = 'dark',
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !(window as any).TradingView) return;

    const widget = new (window as any).TradingView.widget({
      symbol,
      interval: 'D',
      timeframe: 'D',
      colorTheme,
      width: typeof width === 'number' ? width : undefined,
      height,
      locale: 'en',
      toolbar_bg: '#111319',
      enable_publishing: false,
      allow_symbol_change: false,
      details: true,
      hotlist: false,
      calendar: false,
      studies: [],
      container_id: containerRef.current.id,
    });

    widgetRef.current = widget;

    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, [symbol, width, height, colorTheme]);

  return (
    <div
      ref={(el) => {
        if (el) {
          el.id = `tv-widget-${symbol.replace('.', '-')}-${Math.random().toString(36).slice(2, 8)}`;
          containerRef.current = el;
        }
      }}
      style={{ width, height, minWidth: 140 }}
    />
  );
}

export function TradingViewMiniChart({
  symbol,
  width = '100%',
  height = 100,
  colorTheme = 'dark',
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !(window as any).TradingView) return;

    const widget = new (window as any).TradingView.widget({
      symbol,
      interval: 'D',
      timeframe: 'D',
      // tv.js reads `theme`, not `colorTheme`, and `autosize` keeps the
      // wrapper at 100% of the tile instead of the 800px default.
      theme: colorTheme,
      autosize: true,
      width: typeof width === 'number' ? width : undefined,
      height,
      locale: 'en',
      toolbar_bg: '#111319',
      enable_publishing: false,
      allow_symbol_change: false,
      details: false,
      hotlist: false,
      calendar: false,
      studies: [],
      container_id: containerRef.current.id,
      style: '1',
      hide_legend: true,
      grid_line_color: 'rgba(255,255,255,0.06)',
      line_color: '#44d2c5',
      line_width: 1,
    });

    widgetRef.current = widget;

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch {
          // Widget iframe may already be gone on fast route changes.
        }
        widgetRef.current = null;
      }
    };
  }, [symbol, width, height, colorTheme]);

  return (
    <div
      ref={(el) => {
        if (el) {
          el.id = `tv-minichart-${symbol.replace('.', '-')}-${Math.random().toString(36).slice(2, 8)}`;
          containerRef.current = el;
        }
      }}
      style={{ width, height, minWidth: 120 }}
    />
  );
}