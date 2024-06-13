'use client';

import { useState, memo } from 'react';
import classNames from 'classnames';

interface RootProps {
  title: string;
  celsius: number;
  fahrenheit: number;
  description?: string;
  wind?: number;
  humidity?: number;
  pressure?: number;
  lite?: boolean;
}

const Forecast = ({ title, celsius, fahrenheit, description, wind, humidity, pressure, lite = false }: RootProps) => {
  const [isCelsius, toggleTemperature] = useState(true);

  const titleClasses = classNames({
    'font-semibold text-lg text-gray-800': true,
    'font-semibold text-md text-gray-800': lite,
  });

  const temperatureClasses = classNames({
    'font-bold text-[50px] text-gray-800': true,
    'font-normal text-base text-gray-800': lite,
  });

  return (
    <div
      className='w-1/2 p-4 flex flex-col gap-4 justify-center items-start cursor-pointer'
      onClick={() => toggleTemperature(!isCelsius)}
      role='button'
      aria-pressed={!isCelsius}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleTemperature(!isCelsius);
        }
      }}
    >
      <div>
        <p className={titleClasses}>{title}</p>
        <p className={temperatureClasses}>{isCelsius ? `${celsius.toFixed(0)}ºC` : `${fahrenheit.toFixed(0)}ºF`}</p>
      </div>

      {description && (
        <div>
          <p className='font-normal text-md text-gray-800 capitalize'>{description}</p>
        </div>
      )}

      {wind && humidity && pressure && (
        <div>
          <p className='font-normal text-md text-gray-800'>Vento: {wind}</p>
          <p className='font-normal text-md text-gray-800'>Humidade: {humidity}</p>
          <p className='font-normal text-md text-gray-800'>Pressão: {pressure}</p>
        </div>
      )}
    </div>
  );
};

export default memo(Forecast);
