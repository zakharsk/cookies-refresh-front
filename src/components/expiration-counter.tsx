'use client';

import { useEffect, useState } from 'react';

import { msToMinAndSec } from '@/lib/ms-to-m-s.lib';

type ExpirationCounterProps = {
  exp: number;
  now: number;
};

export default function ExpirationCounter(props: ExpirationCounterProps) {
  const [counter, setCounter] = useState<number>(1);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    if (counter > 0) {
      intervalId = setInterval(() => {
        const expiresIn = props.exp * 1000 - Date.now();
        setCounter(expiresIn);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [counter, props.exp]);

  return <span>{counter > 0 ? msToMinAndSec(counter) : 'Expired'}</span>;
}
