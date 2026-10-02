export type HourForecast = {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationChance: number;
};

export type CityWeather = {
  slug: string;
  name: string;
  region: string;
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  precipitationChance: number;
  high: number;
  low: number;
  localTime: string;
  hourly: HourForecast[];
};

type OpenMeteoResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

const cities = [
  { slug: 'las-vegas', name: 'Las Vegas', region: 'Nevada', latitude: 36.1699, longitude: -115.1398 },
  { slug: 'san-francisco', name: 'San Francisco', region: 'California', latitude: 37.7749, longitude: -122.4194 },
  { slug: 'palo-alto', name: 'Palo Alto', region: 'California', latitude: 37.4419, longitude: -122.143 },
  { slug: 'seattle', name: 'Seattle', region: 'Washington', latitude: 47.6062, longitude: -122.3321 },
  { slug: 'dallas', name: 'Dallas', region: 'Texas', latitude: 32.7767, longitude: -96.7970 },
  { slug: 'miami', name: 'Miami', region: 'Florida', latitude: 25.7617, longitude: -80.1918 },
  { slug: 'dededo', name: 'Dededo', region: 'Guam', latitude: 13.5178, longitude: 144.8391 },
  { slug: 'baguio-city', name: 'Baguio City', region: 'Philippines', latitude: 16.4023, longitude: 120.5960 },
];

function mapOpenMeteo(city: (typeof cities)[number], data: OpenMeteoResponse): CityWeather {
  const times = data.hourly.time;
  let start = times.findIndex((time) => time >= data.current.time);
  if (start < 0) start = 0;
  const hourly = times.slice(start, start + 6).map((time, offset) => ({
    time,
    temperature: data.hourly.temperature_2m[start + offset],
    weatherCode: data.hourly.weather_code[start + offset],
    precipitationChance: data.hourly.precipitation_probability[start + offset] ?? 0,
  }));
  return {
    slug: city.slug,
    name: city.name,
    region: city.region,
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    weatherCode: data.current.weather_code,
    windSpeed: data.current.wind_speed_10m,
    humidity: data.current.relative_humidity_2m,
    precipitationChance: hourly[0]?.precipitationChance ?? 0,
    high: data.daily.temperature_2m_max[0],
    low: data.daily.temperature_2m_min[0],
    localTime: data.current.time,
    hourly,
  };
}

async function fetchDirect(): Promise<CityWeather[]> {
  return Promise.all(cities.map(async (city) => {
    const params = new URLSearchParams({
      latitude: String(city.latitude),
      longitude: String(city.longitude),
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,precipitation_probability,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: 'auto',
      forecast_days: '1',
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
    return mapOpenMeteo(city, await response.json() as OpenMeteoResponse);
  }));
}

export async function fetchWeather(): Promise<CityWeather[]> {
  try {
    const response = await fetch('/api/weather/cities');
    if (response.ok) return await response.json() as CityWeather[];
  } catch {
    // In local UI-only mode the dashboard can still use the public weather API directly.
  }
  return fetchDirect();
}

export function getCondition(code: number): { label: string; summary: string; kind: 'clear' | 'partly' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm' } {
  if (code === 0) return { label: 'Clear sky', summary: 'Clear skies ahead.', kind: 'clear' };
  if (code === 1) return { label: 'Mostly clear', summary: 'Mostly clear, with room for sunshine.', kind: 'clear' };
  if (code === 2) return { label: 'Partly cloudy', summary: 'A mix of sun and passing clouds.', kind: 'partly' };
  if (code === 3) return { label: 'Overcast', summary: 'Cloud cover is holding steady.', kind: 'cloudy' };
  if (code === 45 || code === 48) return { label: 'Foggy', summary: 'Soft skies and reduced visibility.', kind: 'fog' };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Light drizzle', summary: 'A little drizzle is possible.', kind: 'drizzle' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain showers', summary: 'Rain showers are moving through.', kind: 'rain' };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', summary: 'Snowfall is in the forecast.', kind: 'snow' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorms', summary: 'Storms may move through today.', kind: 'storm' };
  return { label: 'Cloudy intervals', summary: 'Clouds and sunshine take turns.', kind: 'partly' };
}
