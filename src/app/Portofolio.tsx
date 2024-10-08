import { portfolios } from "../mapping/index";
import { createSignal, For, onCleanup, onMount } from "solid-js";
import { Motion } from "solid-motionone";
import AOS from "aos";
import "aos/dist/aos.css";

onMount(() => {
  AOS.init({
    once: false,
  });
});

export function Portfolios() {
  const [scale, setScale] = createSignal(0.8);
  const [opacity, setOpacity] = createSignal(0.6);
  const [hoveredIndex, setHoveredIndex] = createSignal<number | null>(null);
  let ref: HTMLDivElement | undefined;

  const handleScroll = () => {
    if (!ref) return;
    const rect = ref.getBoundingClientRect();
    const scrollY = window.scrollY + window.innerHeight;
    const targetHeight = window.innerHeight + ref.offsetHeight;

    const scrollYProgress = (scrollY - rect.top) / targetHeight;
    const newScale = 0.8 + scrollYProgress * 0.2;
    const newOpacity = 0.6 + scrollYProgress * 0.4;

    setScale(Math.min(1, Math.max(0.8, newScale)));
    setOpacity(Math.min(1, Math.max(0.6, newOpacity)));
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set values
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <section id="portfolio" class="container mx-auto p-7">
      <div
        class="flex items-center justify-start pt-10"
        data-aos="fade-right"
        data-aos-once="false">
        <div class="w-7 h-px bg-textColors-secondary mr-2 md:mr-4"></div>
        <h3 class="font-normal tracking-[0.5rem] text-textColors-secondary uppercase">
          My Works
        </h3>
      </div>
      <h1
        class="text-2xl md:text-3xl font-bold text-start text-textColors-primary mt-2"
        data-aos="fade-right"
        data-aos-once="false">
        Featured Portfolios
      </h1>

      <Motion.div
        ref={(el) => (ref = el as HTMLDivElement)}
        style={{ transform: `scale(${scale()})`, opacity: opacity() }}>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 ">
          <For each={portfolios}>
            {(portfolio, index) => (
              <div
                class={`relative rounded-xl overflow-hidden border border-solid border-borderColors mt-14 shadow-lg transition-all duration-200 transform ${
                  hoveredIndex() !== null && hoveredIndex() !== index()
                    ? "blur-sm"
                    : "hover:scale-105"
                }`}
                onMouseEnter={() => setHoveredIndex(index())}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div class="h-[250px] relative overflow-hidden">
                  <img
                    src={portfolio.image}
                    alt={portfolio.title}
                    class="w-full h-auto object-cover block"
                  />
                </div>
                <div class="p-5">
                  <div class="flex justify-between items-center">
                    <h4 class="font-medium text-base text-textColors-primary">
                      {portfolio.title}
                    </h4>
                    <a
                      href={portfolio.link}
                      class="text-black group hover:text-iconColors-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        class="fill-current">
                        <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z" />
                      </svg>
                    </a>
                  </div>
                  <div class="flex flex-wrap gap-4 mt-8">
                    <For each={portfolio.tags}>
                      {(tag) => (
                        <div class="text-sm border border-solid border-gray-300 px-4 py-2 text-secondary max-w-full">
                          {tag}
                        </div>
                      )}
                    </For>
                  </div>
                  <p class="text-lg text-textColors-secondary mt-7">
                    {portfolio.description}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </Motion.div>
    </section>
  );
}
