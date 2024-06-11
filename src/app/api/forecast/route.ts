import { NextResponse, NextRequest } from 'next/server';
import { fetchForecastData } from '@/services/forecast';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json({ error: 'Location query parameter is required' }, { status: 400 });
  }

  try {
    const data = await fetchForecastData(location);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Could not fetch weather data' }, { status: 500 });
  }
}
