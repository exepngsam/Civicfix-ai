import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  durationMs = 1200,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + (endValue - startValue) * easedProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, durationMs]);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};
