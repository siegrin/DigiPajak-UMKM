'use client';
import { useEffect, useState, useRef } from 'react';
import { formatCurrency } from '@/lib/utils';

export default function AnimatedCounter({
  value,
  duration = 1000,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const startValueRef = useRef(0);

  useEffect(() => {
    let startTime: number | null = null;
    const end = value;
    const start = startValueRef.current;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const newCount = Math.floor(progress * (end - start) + start);

      setCount(newCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        startValueRef.current = end;
      }
    };

    const reqId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqId);
      startValueRef.current = value;
    };
  }, [value, duration]);

  return <>{formatCurrency(count)}</>;
}
