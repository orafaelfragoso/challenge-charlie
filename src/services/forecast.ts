import { celsiusToFahrenheit } from '@/utils/forecast';
import { MonitoringTool } from './monitoring';
import { env } from '@/utils/env';

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  pod: string;
}

export interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface OpenWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

export interface Forecast {
  temperatureInCelcius: number;
  temperatureInFahrenheit: number;
  description: string;
  wind: number;
  humidity: number;
  pressure: number;
}

export interface Response {
  today: Forecast;
  tomorrow: Forecast;
  dayAfterTomorrow: Forecast;
}

const parseForecastData = (forecast: ForecastItem): Forecast => {
  return {
    temperatureInCelcius: forecast.main.temp,
    temperatureInFahrenheit: celsiusToFahrenheit(forecast.main.temp),
    description: forecast.weather[0].description,
    wind: forecast.wind.speed,
    humidity: forecast.main.humidity,
    pressure: forecast.main.pressure,
  };
};

export const fetchForecastData = async (location: string, monitoring?: MonitoringTool): Promise<Response> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${env.OPEN_WEATHER_API_KEY}&units=metric&lang=pt_br`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: OpenWeatherResponse = await response.json();
    const res: Response = {
      today: parseForecastData(data.list[0]),
      tomorrow: parseForecastData(data.list[1]),
      dayAfterTomorrow: parseForecastData(data.list[2]),
    };

    return res;
  } catch (error) {
    if (error instanceof Error) {
      monitoring?.captureAndLogException(error);
    } else {
      monitoring?.captureAndLogException(new Error('Unknown error occurred'));
    }
    throw new Error('Could not fetch weather data');
  }
};
