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
      <body className='relative h-screen overflow-hidden'>
        <div
          className='absolute inset-0 bg-white bg-cover bg-center filter blur-lg'
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>
        <div className='relative'>{children}</div>
      </body>
    </html>
  );
}
