import { useEffect, useState, useRef, useContext } from "react";
import Context from "../services/Context";

export const useEventListener = (
    target: EventTarget | undefined, 
    event: string, 
    listener: EventListenerOrEventListenerObject, 
    trigger = true
): void => {
    useEffect(() => {
        const t = target || window
        t.addEventListener(event, listener);
        trigger && t.dispatchEvent(new Event(event));
        return () => t.removeEventListener(event, listener);
    });
};

export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export const useCustomContext = (contextKey: string) => {
  const [value, setValue] = useContext(Context)[contextKey]
  return [value, setValue]
}
