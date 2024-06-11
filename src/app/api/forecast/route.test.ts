import { NextRequest } from 'next/server';
import { fetchForecastData } from '@/services/forecast';
import { GET } from './route';

jest.mock('@/services/forecast');

const createMockNextRequest = (url: string) => {
  return new NextRequest(new Request(url));
};

describe('GET /api/forecast', () => {
  it('should return forecast data for a valid location', async () => {
    const mockResponse = { data: 'mock data' };
    (fetchForecastData as jest.Mock).mockResolvedValue(mockResponse);

    const request = createMockNextRequest('http://localhost:3000/api/forecast?location=Rio de Janeiro');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockResponse);
  });

  it('should return 400 if location is missing', async () => {
    const request = createMockNextRequest('http://localhost:3000/api/forecast');
    const response = await GET(request);

    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe('Location query parameter is required');
  });

  it('should return 500 if there is an error fetching forecast data', async () => {
    (fetchForecastData as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    const request = createMockNextRequest('http://localhost:3000/api/forecast?location=Rio de Janeiro');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe('Could not fetch weather data');
  });
});
