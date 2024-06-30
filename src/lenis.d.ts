declare module "@studio-freight/lenis" {
  type EasingFunction = (t: number) => number;

  interface LenisOptions {
    duration?: number;
    easing?: EasingFunction;
    direction?: "vertical" | "horizontal";
    gestureDirection?: "vertical" | "horizontal";
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);

    raf(time: number): void;
    destroy(): void;
    scrollTo(element: Element | HTMLElement | null): void;

    on(
      event: "scroll",
      callback: ({ scroll }: { scroll: number }) => void
    ): void;
  }
}
