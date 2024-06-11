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
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface OpenWeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const fetchForecastData = async (
  location: string,
  monitoring?: MonitoringTool
): Promise<OpenWeatherResponse> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${env.OPEN_WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: OpenWeatherResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      monitoring?.captureAndLogException(error);
    } else {
      monitoring?.captureAndLogException(new Error('Unknown error occurred'));
    }
    throw new Error('Could not fetch weather data');
  }
};
