import { createSignal, onCleanup } from "solid-js";

export function ScrollUp() {
  const [visible, setVisible] = createSignal(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisibility);

  onCleanup(() => {
    window.removeEventListener("scroll", toggleVisibility);
  });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      class={`fixed bottom-5 right-5 rounded-full w-10 h-10 bg-opacity-80 bg-iconColors-primary text-white transition-opacity duration-300 ${
        visible() ? "opacity-100" : "opacity-0"
      }`}>
      ↑
    </button>
  );
}
