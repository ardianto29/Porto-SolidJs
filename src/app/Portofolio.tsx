import { portfolios } from "../mapping/index";
import { createSignal, For, onCleanup, onMount } from "solid-js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Portfolios() {
  const [hoveredIndex, setHoveredIndex] = createSignal<number | null>(null);
  let sectionRef: HTMLElement | undefined;
  let titleRef: HTMLHeadingElement | undefined;
  let subtitleRef: HTMLDivElement | undefined;
  let cardsContainerRef: HTMLDivElement | undefined;
  let cardsRef: HTMLDivElement[] = [];

  onMount(() => {
    // Header animation
    if (titleRef && subtitleRef) {
      gsap.set([titleRef, subtitleRef], { opacity: 0, y: 30 });
      
      gsap.to([titleRef, subtitleRef], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef,
          start: "top 80%",
          end: "top 50%",
        }
      });
    }

    // Horizontal scroll animation for cards
    if (cardsContainerRef && cardsRef.length > 0) {
      const totalWidth = cardsRef.length * 380; // Card width + gap
      const scrollDistance = totalWidth - window.innerWidth;

      // Set initial position
      gsap.set(cardsContainerRef, { x: 0 });

      // Create scroll-triggered horizontal animation
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef,
          start: "top top",
          end: () => `+=${scrollDistance + window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animate horizontal scroll
      tl.to(cardsContainerRef, {
        x: -scrollDistance,
        ease: "none",
      });

      // Individual card entrance animations
      cardsRef.forEach((card, index) => {
        gsap.fromTo(card, 
          {
            opacity: 0.6,
            scale: 0.8,
            y: 50
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef,
              start: "top center",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    // Cleanup
    onCleanup(() => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  });

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    const element = cardsRef[index];
    if (element) {
      gsap.to(element, {
        scale: 1.05,
        rotateY: 5,
        z: 50,
        duration: 0.4,
        ease: "power2.out"
      });
    }

    // Animate other cards to blur
    cardsRef.forEach((card, i) => {
      if (i !== index && card) {
        gsap.to(card, {
          filter: "blur(2px)",
          scale: 0.95,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    
    const element = cardsRef[index];
    if (element) {
      gsap.to(element, {
        scale: 1,
        rotateY: 0,
        z: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }

    // Reset all cards
    cardsRef.forEach(card => {
      if (card) {
        gsap.to(card, {
          filter: "blur(0px)",
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      class="relative bg-black"
      style="height: 100vh; overflow: hidden;"
    >
      {/* Animated Background Elements */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float" style="animation-delay: -2s;"></div>
      </div>

      {/* Floating Particles */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-sparkle"></div>
        <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-sparkle" style="animation-delay: -1s;"></div>
        <div class="absolute top-1/2 left-3/4 w-3 h-3 bg-white/10 rounded-full animate-sparkle" style="animation-delay: -2s;"></div>
      </div>

      {/* Fixed Header Section */}
      <div class="absolute top-0 left-0 right-0 z-50 py-6 bg-gradient-to-b from-black/95 to-transparent">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center">
            <div 
              ref={el => subtitleRef = el}
              class="inline-flex items-center gap-3 mb-3"
            >
              <div class="w-12 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              <span class="text-sm font-medium tracking-[0.2em] text-gray-300 uppercase">
                Featured Works
              </span>
              <div class="w-12 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            </div>
            
            <h1 
              ref={el => titleRef = el}
              class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
            >
              Portfolios
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll Cards Container */}
      <div class="absolute top-0 left-0 w-full h-full flex items-center">
        <div 
          ref={el => cardsContainerRef = el}
          class="flex gap-8 pl-6 mt-20"
        >
          <For each={portfolios}>
            {(portfolio, index) => (
              <div
                ref={el => cardsRef[index()] = el}
                class="group relative flex-shrink-0 w-[320px]"
                onMouseEnter={() => handleMouseEnter(index())}
                onMouseLeave={() => handleMouseLeave(index())}
                style="transform-style: preserve-3d; perspective: 1000px;"
              >
                {/* Card Number */}
                <div class="absolute -top-6 left-0 z-30">
                  <span class="text-4xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent opacity-60">
                    {String(index() + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Card Container */}
                <div class="relative h-[380px] bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                  
                  {/* Image Container */}
                  <div class="relative h-48 overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent z-10"></div>
                    <img
                      src={portfolio.image}
                      alt={portfolio.title}
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay with Link */}
                    <div class="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <a
                        href={portfolio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                      >
                        <span>View</span>
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div class="p-4 relative h-[180px] flex flex-col justify-between">
                    <div>
                      <h3 class="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 leading-tight">
                        {portfolio.title}
                      </h3>
                      
                      <p class="text-gray-300 mb-4 leading-relaxed line-clamp-3 text-base">
                        {portfolio.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div class="flex flex-wrap gap-2">
                      <For each={portfolio.tags.slice(0, 3)}>
                        {(tag) => (
                          <span class="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 text-gray-200 rounded-full backdrop-blur-sm">
                            {tag}
                          </span>
                        )}
                      </For>
                      {portfolio.tags.length > 3 && (
                        <span class="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-200 rounded-full backdrop-blur-sm">
                          +{portfolio.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Gradient Border */}
                  <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                </div>
              </div>
            )}
          </For>

          {/* End spacer for smooth finish */}
          <div class="flex-shrink-0 w-96 flex items-center justify-center">
            <div class="text-center">
              <div class="inline-flex flex-col items-center gap-4">
                <p class="text-gray-400 text-lg font-medium">
                  Like what you see?
                </p>
                <a
                  href="#contact"
                  class="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-1"
                >
                  <span class="relative z-10">Let's Work Together</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 text-center">
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm uppercase tracking-wider">Scroll to Explore</span>
          <div class="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-orange-500 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
