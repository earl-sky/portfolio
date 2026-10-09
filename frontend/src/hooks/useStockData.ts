import { useState, useEffect, useCallback } from 'react';

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  volume?: number;
  high?: number;
  low?: number;
  open?: number;
}

const TWELVE_DATA_API = 'https://api.twelvedata.com/quote';
const DEMO_API_KEY = 'demo'; // Free demo key, 800 requests/day

async function fetchFromTwelveData(symbols: string[]): Promise<StockQuote[]> {
  const symbolParam = symbols.join(',');
  const url = `${TWELVE_DATA_API}?symbol=${symbolParam}&apikey=${DEMO_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const data = await response.json();
  
  // Twelve Data returns an object with symbol keys when multiple symbols
  const results = Array.isArray(data) ? data : Object.values(data);
  
  return results
    .filter((r: any) => r && r.close !== undefined)
    .map((r: any) => ({
      symbol: r.symbol,
      price: parseFloat(r.close),
      change: parseFloat(r.change || '0'),
      changePercent: parseFloat(r.percent_change || '0'),
      lastUpdated: new Date().toLocaleTimeString(),
      volume: parseInt(r.volume || '0'),
      high: parseFloat(r.high || '0'),
      low: parseFloat(r.low || '0'),
      open: parseFloat(r.open || '0'),
    }));
}

const DEMO_QUOTES: StockQuote[] = [
  { symbol: 'AAPL', price: 182.52, change: 2.31, changePercent: 1.28, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'MSFT', price: 415.23, change: -1.45, changePercent: -0.35, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'NVDA', price: 875.42, change: 15.67, changePercent: 1.82, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'AMZN', price: 178.91, change: 0.89, changePercent: 0.50, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'GOOGL', price: 142.56, change: -0.78, changePercent: -0.54, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'META', price: 498.32, change: 5.21, changePercent: 1.06, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'BRK.B', price: 412.15, change: 1.23, changePercent: 0.30, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'LLY', price: 756.89, change: -3.45, changePercent: -0.45, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'AVGO', price: 1342.56, change: 8.91, changePercent: 0.67, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'JPM', price: 198.67, change: 0.54, changePercent: 0.27, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'V', price: 267.89, change: -0.45, changePercent: -0.17, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'XOM', price: 115.34, change: 0.67, changePercent: 0.58, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'UNH', price: 512.45, change: -2.10, changePercent: -0.41, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'COST', price: 789.12, change: 3.45, changePercent: 0.44, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'MA', price: 445.67, change: 1.23, changePercent: 0.28, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'HD', price: 356.78, change: -1.89, changePercent: -0.53, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'PG', price: 156.43, change: 0.34, changePercent: 0.22, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'NFLX', price: 634.56, change: 8.91, changePercent: 1.42, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'ORCL', price: 134.56, change: -0.78, changePercent: -0.58, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'CRM', price: 267.89, change: 2.34, changePercent: 0.88, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'ABBV', price: 178.90, change: -1.12, changePercent: -0.62, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'KO', price: 61.23, change: 0.12, changePercent: 0.20, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'MRK', price: 112.34, change: -0.56, changePercent: -0.50, lastUpdated: new Date().toLocaleTimeString() },
  { symbol: 'BAC', price: 38.90, change: 0.45, changePercent: 1.17, lastUpdated: new Date().toLocaleTimeString() },
];

export function useStockData(symbols: string[]) {
  const [quotes, setQuotes] = useState<StockQuote[]>(DEMO_QUOTES.filter(q => symbols.includes(q.symbol)));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFromTwelveData(symbols);
      if (data.length > 0) {
        setQuotes(data);
        setLastFetch(new Date());
      } else {
        throw new Error('No data returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quotes');
      console.warn('Using demo data:', err);
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 60000);
    return () => clearInterval(interval);
  }, [fetchQuotes]);

  return { quotes, loading, error, lastFetch, refetch: fetchQuotes };
}

export function getColorForChange(changePercent: number): string {
  if (changePercent > 0.5) return 'lime';
  if (changePercent > 0) return 'teal';
  if (changePercent < -0.5) return 'red';
  if (changePercent < 0) return 'slate';
  return 'slate';
}