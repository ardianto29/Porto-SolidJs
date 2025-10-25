import { portfolios } from "../mapping/index";
import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Portfolio {
  image: string;
  title: string;
  link: string;
  tags: string[];
  description: string;
}

export function Portfolios() {
  const [hoveredIndex, setHoveredIndex] = createSignal<number | null>(null);
  const [selectedCategory, setSelectedCategory] = createSignal<string>("all");
  const [selectedPortfolio, setSelectedPortfolio] = createSignal<Portfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
  
  let sectionRef: HTMLElement | undefined;
  let headerRef: HTMLDivElement | undefined;
  let cardsContainerRef: HTMLDivElement | undefined;
  let cardRefs: HTMLDivElement[] = [];
  let modalRef: HTMLDivElement | undefined;
  let modalContentRef: HTMLDivElement | undefined;

  const categories = ["all", "web", "fullstack", "frontend"];

  const filteredPortfolios = () => {
    const category = selectedCategory();
    if (category === "all") return portfolios;
    return portfolios.filter(p => 
      p.tags.some(tag => tag.toLowerCase().includes(category))
    );
  };

  const openModal = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
    
    // Lock body scroll completely
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Let Lenis know we are interacting with an inner scroll area (modal)
    // so wheel events should not be hijacked by the smooth scroller.
    document.documentElement.setAttribute('data-lenis-prevent', '');

    // Animate modal entrance
    if (modalRef && modalContentRef) {
      gsap.set(modalRef, { opacity: 0, display: 'flex' });
      gsap.set(modalContentRef, { scale: 0.8, y: 50, opacity: 0 });
      
      const tl = gsap.timeline();
      tl.to(modalRef, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(modalContentRef, {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      }, "-=0.1");
    }
  };

  const closeModal = () => {
    if (modalRef && modalContentRef) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedPortfolio(null);
          
          // Restore body scroll
          const scrollY = document.body.style.top;
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          document.documentElement.removeAttribute('data-lenis-prevent');
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      });
      
      tl.to(modalContentRef, {
        scale: 0.8,
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(modalRef, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, "-=0.1")
      .set(modalRef, { display: 'none' });
    }
  };

  onMount(() => {
    // Header Animation
    if (headerRef) {
      gsap.from(headerRef.children, {
        scrollTrigger: {
          trigger: sectionRef,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });
    }

    // Cards Animation - Optimized for performance
    cardRefs.forEach((card, index) => {
      if (card) {
        const delay = index * 0.08;
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true, // Only animate once for better performance
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: delay,
          ease: "power2.out"
        });

        // Remove parallax effect for better performance on low-end devices
      }
    });

    // Keyboard support for modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen()) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    onCleanup(() => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('keydown', handleKeyDown);
    });
  });

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardRefs[index];
    if (!card) return;

    if (isEntering) {
      setHoveredIndex(index);
      // Simplified hover animation
      gsap.to(card, {
        y: -8,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      setHoveredIndex(null);
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      class="relative bg-gradient-to-b from-black via-gray-950 to-black min-h-screen overflow-hidden"
    >
      {/* Minimalist Background */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid lines - very subtle */}
        <div 
          class="absolute inset-0 opacity-[0.02]" 
          style="background-image: linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px); background-size: 100px 100px;"
        ></div>
      </div>

      {/* Spacer untuk menurunkan konten */}
      <div class="h-20"></div>

      <div class="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Modern Header */}
        <div ref={headerRef} class="mb-20">
          {/* Small tag */}
          <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
            <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            <span class="text-xs font-semibold text-orange-400 uppercase tracking-widest">My Work</span>
          </div>

          {/* Title */}
          <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">
            Selected <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">Projects</span>
          </h1>

          {/* Description */}
          <p class="text-xl text-gray-400 max-w-2xl leading-relaxed">
            A showcase of creative solutions and technical excellence
          </p>

          {/* Stats - Minimalist */}
          <div class="flex gap-12 mt-12">
            <div>
              <div class="text-4xl font-bold text-white mb-1">8+</div>
              <div class="text-sm text-gray-500 uppercase tracking-wider">Projects</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-white mb-1">5+</div>
              <div class="text-sm text-gray-500 uppercase tracking-wider">Tech Stack</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-white mb-1">100%</div>
              <div class="text-sm text-gray-500 uppercase tracking-wider">Quality</div>
            </div>
          </div>
        </div>

        {/* Masonry Grid Layout */}
        <div 
          ref={cardsContainerRef}
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <For each={filteredPortfolios()}>
            {(portfolio, index) => (
              <div
                ref={el => cardRefs[index()] = el}
                class="group relative cursor-pointer"
                onMouseEnter={() => handleCardHover(index(), true)}
                onMouseLeave={() => handleCardHover(index(), false)}
                onClick={(e) => {
                  e.preventDefault();
                  openModal(portfolio);
                }}
              >
                {/* Card */}
                <div class="relative h-full bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-700 will-change-transform">
                  {/* Image */}
                  <div class="relative h-64 overflow-hidden bg-gray-800">
                    <img
                      src={portfolio.image}
                      alt={portfolio.title}
                      class="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Gradient overlay */}
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    
                    {/* Number badge */}
                    <div class="absolute top-4 right-4">
                      <div class="w-10 h-10 rounded-full bg-orange-500/30 border border-orange-500/40 flex items-center justify-center">
                        <span class="text-sm font-bold text-orange-400">{String(index() + 1).padStart(2, '0')}</span>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70">
                      <a
                        href={portfolio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-6 py-3 bg-white/15 border border-white/20 rounded-full text-white font-medium hover:bg-white/25 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>View Project</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div class="p-6">
                    <h3 class="text-xl font-bold text-white mb-2 line-clamp-2">
                      {portfolio.title}
                    </h3>
                    
                    <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                      {portfolio.description}
                    </p>

                    {/* Tags */}
                    <div class="flex flex-wrap gap-2">
                      <For each={portfolio.tags.slice(0, 3)}>
                        {(tag) => (
                          <span class="px-3 py-1 text-xs font-medium bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-full">
                            {tag}
                          </span>
                        )}
                      </For>
                      {portfolio.tags.length > 3 && (
                        <span class="px-3 py-1 text-xs font-medium bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full">
                          +{portfolio.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Modal */}
      <Show when={isModalOpen()}>
        <div
          ref={modalRef}
          class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          style="display: none;"
          onWheel={(e) => {
            // Allow wheel scrolling inside the modal content but prevent it on the dark overlay.
            // This avoids the background page from scrolling while keeping native scroll inside the modal.
            const target = e.target as Node;
            const insideContent = modalContentRef && modalContentRef.contains(target);
            if (!insideContent) {
              e.preventDefault();
            }
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div 
            class="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div
              ref={modalContentRef}
              class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-gray-800 rounded-3xl shadow-2xl"
              data-lenis-prevent
            >
            {/* Close Button */}
            <button
              onClick={closeModal}
              class="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 transition-all duration-300 group"
            >
              <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <Show when={selectedPortfolio()}>
              {(portfolio) => (
                <>
                  {/* Image Section */}
                  <div class="relative h-96 overflow-hidden rounded-t-3xl bg-gray-800">
                    <img
                      src={portfolio().image}
                      alt={portfolio().title}
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    
                    {/* Title Overlay */}
                    <div class="absolute bottom-0 left-0 right-0 p-8">
                      <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                        {portfolio().title}
                      </h2>
                      <a
                        href={portfolio().link}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                      >
                        <span>Visit Project</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div class="p-8 md:p-12">
                    {/* Description */}
                    <div class="mb-8">
                      <h3 class="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Project Description
                      </h3>
                      <p class="text-gray-300 leading-relaxed text-lg">
                        {portfolio().description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 class="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                        </svg>
                        Technologies Used
                      </h3>
                      <div class="flex flex-wrap gap-3">
                        <For each={portfolio().tags}>
                          {(tag) => (
                            <span class="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-full text-gray-300 text-sm font-medium hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300">
                              {tag}
                            </span>
                          )}
                        </For>
                      </div>
                    </div>

                    {/* Additional spacing */}
                    <div class="mt-8 pt-8 border-t border-gray-800">
                      <p class="text-center text-gray-500 text-sm">
                        Click outside or press ESC to close
                      </p>
                    </div>
                  </div>
                </>
              )}
            </Show>
            </div>
          </div>
        </div>
      </Show>

      {/* Performance optimization styles */}
      <style>{`
        /* GPU acceleration for smooth animations */
        .group {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Reduce backdrop-blur on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .backdrop-blur-sm,
          .backdrop-blur-md {
            backdrop-filter: none !important;
          }
        }

        /* Optimize images */
        img {
          content-visibility: auto;
          contain-intrinsic-size: 256px;
        }

        /* Reduce blur effects on mobile */
        @media (max-width: 768px) {
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
          .backdrop-blur-md {
            backdrop-filter: blur(6px);
          }
          .blur-3xl {
            filter: blur(40px);
          }
        }
      `}</style>
    </section>
  );
}
