import { useCallback, useEffect, useRef, useState, type ReactNode, type FocusEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { categories, categoryList, type CategoryKey } from '../data/portfolio';
import { fetchWeather, getCondition, type CityWeather } from '../weather';
import MarketTicker from './MarketTicker';
import MusicPlayer from './MusicPlayer';

const locations: { slug: string; name: string; timeZone: string; timeZoneCode?: string; showCelsius?: boolean }[] = [
  { slug: 'las-vegas', name: 'Las Vegas NV', timeZone: 'America/Los_Angeles' },
  { slug: 'palo-alto', name: 'Palo Alto CA', timeZone: 'America/Los_Angeles' },
  { slug: 'san-francisco', name: 'San Francisco CA', timeZone: 'America/Los_Angeles' },
  { slug: 'seattle', name: 'Seattle WA', timeZone: 'America/Los_Angeles' },
  { slug: 'dallas', name: 'Dallas/FW TX', timeZone: 'America/Chicago' },
  { slug: 'miami', name: 'Miami FL', timeZone: 'America/New_York' },
  { slug: 'dededo', name: 'Dededo GU', timeZone: 'Pacific/Guam', timeZoneCode: 'ChST' },
  { slug: 'baguio-city', name: 'Baguio City PH', timeZone: 'Asia/Manila', timeZoneCode: 'PHT', showCelsius: true },
];

function weatherEmoji(city?: CityWeather) {
  if (!city) return '☀️';
  const kind = getCondition(city.weatherCode).kind;
  const hour = Number(/T(\d{2}):/.exec(city.localTime)?.[1] ?? 12);
  const night = hour >= 19 || hour < 6;
  if (kind === 'clear') return night ? '🌙' : '☀️';
  if (kind === 'partly') return night ? '☁️' : '⛅';
  if (kind === 'cloudy' || kind === 'fog') return '☁️';
  if (kind === 'drizzle' || kind === 'rain') return '🌧️';
  if (kind === 'snow') return '🌨️';
  return '⛈️';
}

function formatWeatherClock(date: Date, timeZone: string, fixedCode?: string): string {
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
  const abbreviation = fixedCode ?? new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName')?.value;
  return abbreviation ? `${time} ${abbreviation}` : time;
}

function WeatherRail({ cities }: { cities: CityWeather[] }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(clock);
  }, []);

  return (
    <div className="weather-rail">
      <div className="weather-rail-inner" role="list" aria-label="Live weather and local time">
        {locations.map(({ slug, name, timeZone, timeZoneCode, showCelsius }) => {
          const city = cities.find((item) => item.slug === slug);
          const fahrenheit = city ? Math.round(city.temperature) : null;
          const celsius = fahrenheit === null ? null : Math.round((fahrenheit - 32) * 5 / 9);
          const temperature = fahrenheit === null
            ? (showCelsius ? '—°F / —°C' : '—°F')
            : showCelsius
              ? `${fahrenheit}°F / ${celsius}°C`
              : `${fahrenheit}°F`;
          const localClock = formatWeatherClock(now, timeZone, timeZoneCode);
          return (
            <div className="weather-pill" role="listitem" key={slug} aria-label={`${name}: ${temperature}; local time ${localClock}`}>
              <span className="weather-emoji" aria-hidden="true">{weatherEmoji(city)}</span>
              <span className="weather-temp">{temperature}</span>
              <span className="weather-place">{name}</span>
              <span className="weather-time">{localClock}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CategoryDropdown({
  categoryKey,
  openMenu,
  setOpenMenu,
}: {
  categoryKey: CategoryKey;
  openMenu: CategoryKey | null;
  setOpenMenu: (key: CategoryKey | null) => void;
}) {
  const category = categories[categoryKey];
  const isOpen = openMenu === categoryKey;
  const toggle = () => setOpenMenu(isOpen ? null : categoryKey);

  return (
    <div
      className={`nav-dropdown nav-dropdown-${categoryKey}${isOpen ? ' is-open' : ''}`}
      onBlur={(event: FocusEvent<HTMLDivElement>) => {
        const target = event.relatedTarget;
        if (!(target instanceof Node) || !event.currentTarget.contains(target)) setOpenMenu(null);
      }}
    >
      <div className="nav-dropdown-main">
        <NavLink to={`/${categoryKey}`} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpenMenu(null)}>
          {category.label}
        </NavLink>
        <button
          type="button"
          className="nav-dropdown-toggle"
          aria-label={`Toggle ${category.label} menu`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setOpenMenu(categoryKey);
            }
          }}
          onClick={toggle}
        >
          <ChevronDown size={12} aria-hidden="true" />
        </button>
      </div>
      {isOpen && (
        <div className="dropdown-panel" role="menu" aria-label={`${category.label} pages`}>
          <Link role="menuitem" to={`/${categoryKey}`} onClick={() => setOpenMenu(null)}>
            <span>{category.label} overview</span><small>All projects</small>
          </Link>
          {category.projects.map((project) => (
            <Link role="menuitem" key={project.slug} to={project.route} onClick={() => setOpenMenu(null)}>
              <span>{project.title}</span><small>{project.kicker}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function GlobalHeader() {
  const [openMenu, setOpenMenu] = useState<CategoryKey | null>(null);
  const [brandText, setBrandText] = useState('EarlSky');
  const [brandScrambling, setBrandScrambling] = useState(false);
  const brandTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const resetBrand = () => {
    if (brandTimer.current !== null) window.clearInterval(brandTimer.current);
    brandTimer.current = null;
    setBrandText('EarlSky');
    setBrandScrambling(false);
  };

  const scrambleBrand = () => {
    resetBrand();
    setBrandScrambling(true);
    const original = 'EarlSky';
    const scrambleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&';
    let step = 0;
    brandTimer.current = window.setInterval(() => {
      step += 1;
      const settledCount = Math.floor((step / 12) * original.length);
      setBrandText(original.split('').map((character, index) => {
        if (index < settledCount) return character;
        return scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)];
      }).join(''));
      if (step >= 12) resetBrand();
    }, 35);
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      if (brandTimer.current !== null) window.clearInterval(brandTimer.current);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <header className="site-header">
      <Link
        className={`wordmark header-wordmark${brandScrambling ? ' is-scrambling' : ''}`}
        to="/"
        aria-label="EarlSky dot dev home"
        onPointerEnter={scrambleBrand}
        onPointerLeave={resetBrand}
        onFocus={scrambleBrand}
        onBlur={resetBrand}
      >
        {brandText}<span>.dev</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation" ref={navRef}>
        <NavLink end to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        {categoryList.map((category) => (
          <CategoryDropdown key={category.key} categoryKey={category.key} openMenu={openMenu} setOpenMenu={setOpenMenu} />
        ))}
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>Resume</NavLink>
      </nav>
    </header>
  );
}

function GlobalFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><Link className="wordmark" to="/">EarlSky<span>.dev</span></Link><p>Software engineer · building interfaces and systems.</p></div>
      <div className="footer-links">
        <Link to="/software">Software</Link><Link to="/finance">Finance</Link><Link to="/healthcare">Healthcare</Link><Link to="/art">Art</Link><Link to="/about">About</Link>
      </div>
      <div className="footer-bottom"><span>© 2026 EarlSky. Built with React, Spring Boot &amp; Docker.</span><Link to="/">BACK TO TOP ↑</Link></div>
    </footer>
  );
}

function cursorEmojiForPath(pathname: string): string {
  if (pathname === '/software' || pathname.startsWith('/software/')) return '👾';
  if (pathname === '/finance' || pathname.startsWith('/finance/')) return '💸';
  if (pathname === '/healthcare' || pathname.startsWith('/healthcare/')) return '💊';
  if (pathname === '/art' || pathname.startsWith('/art/')) return '🖼️';
  return '🏎️';
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const racerRef = useRef<HTMLSpanElement>(null);
  const location = useLocation();
  const showMarketTicker = location.pathname === '/' || location.pathname === '/finance' || location.pathname.startsWith('/finance/');

  const loadWeather = useCallback(async () => {
    try {
      setCities(await fetchWeather());
    } catch {
      setCities([]);
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void loadWeather(), 0);
    const refresh = window.setInterval(() => void loadWeather(), 15 * 60 * 1000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(refresh);
    };
  }, [loadWeather]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    const racer = racerRef.current;
    if (!racer || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        racer.style.left = `${event.clientX + 12}px`;
        racer.style.top = `${event.clientY + 10}px`;
        racer.classList.add('is-visible');
      });
    };
    const hide = () => racer.classList.remove('is-visible');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);

  return (
    <div className="portfolio-page">
      {showMarketTicker && <MarketTicker />}
      <WeatherRail cities={cities} />
      <div className="page-shell">
        <GlobalHeader key={location.pathname} />
        {children}
        <GlobalFooter />
      </div>
      <span className="cursor-racer" ref={racerRef} aria-hidden="true">{cursorEmojiForPath(location.pathname)}</span>
      <MusicPlayer />
    </div>
  );
}
