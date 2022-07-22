import { useEffect, useState, useRef, useContext, useCallback } from "react";
import Context from "../services/Context";

export const useEventListener = (
  target: EventTarget | undefined,
  event: string,
  listener: any,
  trigger = true
): void => {
  useEffect(() => {
    const t = target || window
    if(event === 'keydown' || event === 'touchstart'){
      t.addEventListener(event, listener);
    }else{
      t.addEventListener(event, listener, { passive: false });
    }
    // trigger && t.dispatchEvent(new Event(event));
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
    let handler: any = null
    clearTimeout(handler);
    handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export const useThrottle = <T>(value: T, interval = 500): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecuted = useRef<number>(Date.now())

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    } else {
      let timeout: any = null
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottledValue(value)
      }, interval)

      return () => clearTimeout(timeout)
    }
  }, [value, interval])

  return throttledValue
}

type SSRRect = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}
const EmptySSRRect: SSRRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
}

export const useScroll = () => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0)
  const [bodyOffset, setBodyOffset] = useState<DOMRect | SSRRect>(
    typeof window === "undefined" || !window.document
      ? EmptySSRRect
      : document.body.getBoundingClientRect()
  )
  const [scrollY, setScrollY] = useState<number>(bodyOffset.top)
  const [scrollX, setScrollX] = useState<number>(bodyOffset.left)
  const [scrollDirection, setScrollDirection] = useState<
    "down" | "up" | undefined
  >()

  const listener = (e: Event) => {
    setBodyOffset(
      typeof window === "undefined" || !window.document
        ? EmptySSRRect
        : document.body.getBoundingClientRect()
    )
    setScrollY(-bodyOffset.top)
    setScrollX(bodyOffset.left)
    setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up")
    setLastScrollTop(-bodyOffset.top)
  }

  useEffect(() => {
    window.addEventListener("scroll", listener)
    return () => {
      window.removeEventListener("scroll", listener)
    }
  }, [])

  return {
    scrollY,
    scrollX,
    scrollDirection,
  }
}

const isValidFunction = (func: Function) => {
  return func && typeof func === 'function';
};


export const useCustomContext = (contextKey: string) => {
  const [value, setValue] = useContext(Context)[contextKey]
  return [value, setValue]
}
