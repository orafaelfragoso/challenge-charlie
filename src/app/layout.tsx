import type { Metadata } from 'next';
import './globals.css';
import { fetchBingImageUrl } from '@/services/bing';

export const metadata: Metadata = {
  title: 'Challenge Charlie',
  description: 'Hurb front-end challenge',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bgImage = await fetchBingImageUrl();

  return (
    <html lang='en'>
      <body
        className='relative h-screen overflow-hidden'
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className='absolute inset-0 bg-white bg-opacity-30 bg-cover bg-center filter backdrop-filter backdrop-blur-lg'></div>
        <div className='relative h-screen overflow-hidden w-full flex items-center justify-center'>{children}</div>
      </body>
    </html>
  );
}
