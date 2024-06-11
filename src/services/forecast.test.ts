import { OpenWeatherResponse, fetchForecastData } from './forecast';
import { MonitoringTool } from './monitoring';

class MockMonitoringTool implements MonitoringTool {
  captureAndLogException = jest.fn();
}

global.fetch = jest.fn();

describe('fetchForecastData', () => {
  let mockMonitoringTool: MockMonitoringTool;

  beforeEach(() => {
    mockMonitoringTool = new MockMonitoringTool();
    (global.fetch as jest.Mock).mockReset();
  });

  it('should fetch the weather data successfully', async () => {
    const mockResponse: OpenWeatherResponse = {
      coord: { lon: -43.2075, lat: -22.9028 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: {
        temp: 301.6,
        feels_like: 302.02,
        temp_min: 301.13,
        temp_max: 304.27,
        pressure: 1018,
        humidity: 49,
      },
      visibility: 10000,
      wind: { speed: 3.09, deg: 200 },
      clouds: { all: 0 },
      dt: 1718125064,
      sys: { type: 1, id: 8429, country: 'BR', sunrise: 1718098215, sunset: 1718136904 },
      timezone: -10800,
      id: 3451190,
      name: 'Rio de Janeiro',
      cod: 200,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchForecastData('Rio de Janeiro', mockMonitoringTool);
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=Rio%20de%20Janeiro&appid=772920597e4ec8f00de8d376dfb3f094&units=metric'
    );
    expect(mockMonitoringTool.captureAndLogException).not.toHaveBeenCalled();
  });

  it('should throw an error and capture it with the monitoring tool if the response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchForecastData('Rio de Janeiro', mockMonitoringTool)).rejects.toThrow(
      'Could not fetch weather data'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockMonitoringTool.captureAndLogException).toHaveBeenCalledTimes(1);
  });

  it('should throw an error and capture it with the monitoring tool if fetch throws an error', async () => {
    const fetchError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValue(fetchError);

    await expect(fetchForecastData('Rio de Janeiro', mockMonitoringTool)).rejects.toThrow(
      'Could not fetch weather data'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockMonitoringTool.captureAndLogException).toHaveBeenCalledWith(fetchError);
  });
});
