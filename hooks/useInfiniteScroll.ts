"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any>;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  isLoading,
  rootMargin = "0px",
  threshold = 1.0,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, isLoading]
  );

  useEffect(() => {
    const currentTrigger = triggerRef.current;
    if (!currentTrigger) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null, // relative to viewport
      rootMargin,
      threshold,
    });

    observerRef.current.observe(currentTrigger);

    return () => {
      if (observerRef.current && currentTrigger) {
        observerRef.current.unobserve(currentTrigger);
      }
    };
  }, [handleObserver, rootMargin, threshold]);

  return { triggerRef };
};
export default useInfiniteScroll;
