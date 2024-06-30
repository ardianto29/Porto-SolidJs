import { onCleanup, onMount } from "solid-js";
import Lenis, { LenisOptions } from "@studio-freight/lenis";

export interface UseLenisResult {
  scrollTo: (selector: string) => void;
}

const useLenis = (): UseLenisResult => {
  let lenis: Lenis | undefined;

  onMount(() => {
    const options: LenisOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    };

    lenis = new Lenis(options);

    function handleRaf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(handleRaf);
    }

    requestAnimationFrame(handleRaf);

    onCleanup(() => {
      lenis?.destroy();
    });
  });

  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (lenis && element) {
      lenis.scrollTo(element);
    }
  };

  return {
    scrollTo,
  };
};

export default useLenis;
