'use client';

import { useEffect, useState } from 'react';

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

export default function TypewriterText({
  text,
  speed = 80,
  className,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed(''); // 🔥 reset

    let i = 0;

    const interval = setInterval(() => {
      i++;

      setDisplayed(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
}