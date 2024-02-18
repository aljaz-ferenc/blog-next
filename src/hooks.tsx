import { useRef } from "react";

export function useDebounce(fn: (...args: any) => any, delay: number) {
  const previousRef = useRef(Date.now() + delay);
  const timerRef = useRef<NodeJS.Timeout>();

  return (args: any) => {
    previousRef.current = Date.now();

    if (Date.now() - previousRef.current < delay) {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        fn(args);
        previousRef.current = Date.now();
      }, delay);

      previousRef.current = Date.now();
    } else {
      fn(args);
      previousRef.current = Date.now();
    }
  };
}
