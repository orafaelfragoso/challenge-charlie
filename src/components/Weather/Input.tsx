'use client';

import useCoordinates from '@/hooks/useCoordinates';

interface RootProps {
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

function Input({ value, onChange, onSubmit, loading: loadingForecast }: RootProps) {
  const { fetchCity, loading } = useCoordinates({
    onSuccess(value: string) {
      onChange(value);
      onSubmit(value);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <div className='flex flex-row gap-1 items-center'>
      <button
        data-icon='('
        className='w-12 h-12 text-[32px] flex justify-center items-center text-gray-700 disabled:text-gray-400 disabled:animate-spin'
        aria-label='Get geo coordinates'
        tabIndex={0}
        disabled={loading || loadingForecast}
        onClick={fetchCity}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor='city' className='sr-only'>
          Digite uma cidade
        </label>
        <input
          type='text'
          id='city'
          name='city'
          placeholder='Digite uma cidade'
          className='p-4 ring-0 outline-none font-semibold text-lg border-none disabled:text-gray-400 disabled:bg-white'
          autoComplete='off'
          value={value}
          disabled={loading || loadingForecast}
          onChange={(e) => onChange(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Input;
