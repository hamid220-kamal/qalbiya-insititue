import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    const numberRegex = /\d+/g;
    const numbers = value.match(numberRegex);

    if (!numbers) {
      // Non-numeric value like "Zero", just set it directly
      setDisplayValue(value);
      return;
    }

    // Initialize display with 0 replacing the parsed numbers
    const initialDisplay = value.replace(numberRegex, '0');
    setDisplayValue(initialDisplay);

    if (!isInView) return;

    // Animating parsed numbers
    const targets = numbers.map(Number);
    const currentValues = targets.map(() => 0);

    const controls = targets.map((target, idx) => {
      return animate(0, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // Custom elegant ease-out cubic
        onUpdate: (latest) => {
          currentValues[idx] = Math.round(latest);
          
          // Reconstruct the full string replacing the numbers sequentially
          let matchIndex = 0;
          const updatedString = value.replace(numberRegex, () => {
            const val = currentValues[matchIndex];
            matchIndex++;
            return String(val);
          });
          
          setDisplayValue(updatedString);
        }
      });
    });

    return () => {
      controls.forEach((control) => control.stop());
    };
  }, [value, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  );
};
