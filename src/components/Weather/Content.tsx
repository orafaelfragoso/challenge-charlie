'use client';

import { ReactNode } from 'react';
import classNames from 'classnames';

interface RootProps {
  children: ReactNode;
  temperature: number;
}

function Content({ children, temperature }: RootProps) {
  const classes = classNames({
    'p-2 rounded-lg flex flex-row justify-end': true,
    'bg-blue-50 border-blue-100 border': temperature <= 15,
    'bg-red-50 border-red-100 border': temperature >= 35,
    'bg-yellow-50 border-yellow-100 border': temperature < 35 && temperature > 15,
  });

  return <div className={classes}>{children}</div>;
}

export default Content;