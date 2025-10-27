import { onMount, onCleanup, createSignal, For } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { educationData } from "../mapping";
// Import icon images
import reactIcon from '../assets/images/react.png';
import nodeIcon from '../assets/images/node.png';
import htmlIcon from '../assets/images/html.png';
import cssIcon from '../assets/images/css.png';
import tsIcon from '../assets/images/ts.png';
import jsIcon from '../assets/images/js.png';
import laravelIcon from '../assets/images/laravel.png';
import mysqlIcon from '../assets/images/mysql.png';
import phpIcon from '../assets/images/php.png';
import ciIcon from '../assets/images/ci.png';
import nextjsSvg from '../assets/images/next.webp';
import tailwindIcon from '../assets/images/tailwind.png';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  let journeyTextRef: HTMLParagraphElement | undefined;
  let timelineRef: HTMLDivElement | undefined;
  let progressBarRef: HTMLDivElement | undefined;

  onMount(() => {
    // Ensure page starts from top on mount
    if (window.location.hash === '#skills') {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const offset = skillsSection.offsetTop;
        window.scrollTo(0, offset);
      }
    }
    
    // Refresh ScrollTrigger to ensure proper initialization
    ScrollTrigger.refresh();
    
    // Animate section title
    gsap.from(".skills-header", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    // SplitType animation for journey text
    if (journeyTextRef) {
      const typeSplit = new SplitType(journeyTextRef, {
        types: "lines,words,chars",
        tagName: "span",
      });

      if (typeSplit.lines) {
        typeSplit.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.position = "relative";
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          wrapper.style.paddingTop = "0.10em";
          wrapper.style.paddingBottom = "0.80em";
          wrapper.style.marginTop = "-0.10em";
          wrapper.style.marginBottom = "-0.50em";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      }

      gsap.from(typeSplit.words, {
        y: "115%",
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".description-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Timeline horizontal scroll animation
    if (timelineRef) {
      const timeline = timelineRef;
      const cards = timeline.querySelectorAll(".timeline-card");
      
      // Ensure all cards start from position 0 (force immediate set)
      gsap.set(cards, { 
        x: 0,
        force3D: true,
        immediateRender: true
      });
      
      // Reset progress bar to start
      if (progressBarRef) {
        gsap.set(progressBarRef, { width: "0%" });
      }
      
      // Set ALL cards visible from the start
      gsap.set(cards, { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      });
      
      // Create the main horizontal scroll animation
      const mainAnimation = gsap.to(cards, {
        x: () => -(timeline.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top top",
          end: () => `+=${timeline.scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Progress bar animation
      if (progressBarRef) {
        gsap.to(progressBarRef, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top top",
            end: () => `+=${timeline.scrollWidth}`,
            scrub: true,
          }
        });
      }
    }

    // Technical Skills animations
    // Animate background elements
    gsap.set(".skills-bg-1, .skills-bg-2, .skills-bg-3", {
      scale: 0,
      opacity: 0,
    });

    gsap.to(".skills-bg-1, .skills-bg-2, .skills-bg-3", {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power2.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".skills-section-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate section header
    gsap.from(".skills-section-header .skills-line-left", {
      width: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-section-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(".skills-section-header .skills-line-right", {
      width: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-section-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(".skills-main-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-section-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(".skills-subtitle", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-section-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate skill cards with stagger
    gsap.set(".skill-card", {
      y: 100,
      opacity: 0,
      rotationY: 15,
      scale: 0.8,
    });

    gsap.to(".skill-card", {
      y: 0,
      opacity: 1,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: {
        amount: 1.2,
        from: "start",
      },
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate progress bars
    gsap.set(".skill-progress", { width: 0 });
    
    document.querySelectorAll(".skill-progress").forEach((progress, index) => {
      const targetWidth = progress.getAttribute("data-width");
      if (targetWidth) {
        gsap.to(progress, {
          width: targetWidth,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.1 + 0.5,
          scrollTrigger: {
            trigger: progress,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });
      }
    });

    // Parallax effect for floating elements
    gsap.to(".skills-bg-1", {
      y: -50,
      x: 30,
      rotation: 90,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".skills-bg-2", {
      y: 40,
      x: -20,
      rotation: -45,
      duration: 15,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".skills-bg-3", {
      y: -30,
      x: 25,
      rotation: 60,
      duration: 18,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    // Hover animations for skill cards
    document.querySelectorAll(".skill-card").forEach(card => {
      const iconWrapper = card.querySelector(".skill-icon-wrapper");
      const glow = card.querySelector(".skill-glow");
      
      card.addEventListener("mouseenter", () => {
        gsap.to(iconWrapper, {
          scale: 1.2,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(glow, {
          opacity: 0.8,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(iconWrapper, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    onCleanup(() => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    });
    
    // Final refresh after all animations are set up
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);
  });

  return (
    <section
      id="skills"
      class="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      
      {/* Animated background */}
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

         {/* Technical Skills Section */}
      <div class="relative z-10 py-24 overflow-hidden">
        {/* Animated background elements */}
        <div class="absolute inset-0 opacity-20">
          <div class="skills-bg-1 absolute top-10 left-10 w-32 h-32 bg-blue-500/30 rounded-full blur-xl"></div>
          <div class="skills-bg-2 absolute top-40 right-20 w-24 h-24 bg-purple-500/30 rounded-full blur-xl"></div>
          <div class="skills-bg-3 absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl"></div>
        </div>

        <div class="container mx-auto px-6">
          {/* Section Header */}
          <div class="skills-section-header text-center mb-16">
            <div class="flex items-center justify-center mb-6">
              <div class="skills-line-left w-16 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
              <span class="mx-6 text-sm font-semibold tracking-[0.3rem] text-purple-400 uppercase">
                Technologies
              </span>
              <div class="skills-line-right w-16 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
            </div>
            <h2 class="skills-main-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p class="skills-subtitle text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Technologies and frameworks I use to create amazing digital experiences
            </p>
          </div>

          {/* Skills Grid */}
          <div class="skills-grid max-w-6xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* React JS */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={reactIcon} alt="React JS" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-blue-400 transition-colors">React JS</h3>
                  </div>
                </div>
              </div>

              {/* Node.js */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={nodeIcon} alt="Node JS" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-green-400 transition-colors">Node JS</h3>
                  </div>
                </div>
              </div>

              {/* HTML5 */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={htmlIcon} alt="HTML5" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-orange-400 transition-colors">HTML5</h3>
                  </div>
                </div>
              </div>

              {/* CSS3 */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={cssIcon} alt="CSS3" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-blue-400 transition-colors">CSS3</h3>
                  </div>
                </div>
              </div>

              {/* TypeScript */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={tsIcon} alt="TypeScript" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-blue-400 transition-colors">TypeScript</h3>
                  </div>
                </div>
              </div>

              {/* JavaScript */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={jsIcon} alt="JavaScript" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">JavaScript</h3>
                  </div>
                </div>
              </div>

              {/* Next.js */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-black rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={nextjsSvg} alt="Next.js" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-gray-300 transition-colors">Next.js</h3>
                  </div>
                </div>
              </div>

              {/* PHP */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={phpIcon} alt="PHP" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-purple-400 transition-colors">PHP</h3>
                  </div>
                </div>
              </div>

              {/* Laravel */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={laravelIcon} alt="Laravel" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-red-400 transition-colors">Laravel</h3>
                  </div>
                </div>
              </div>

              {/* MySQL */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={mysqlIcon} alt="MySQL" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-blue-400 transition-colors">MySQL</h3>
                  </div>
                </div>
              </div>

              {/* CI/CD */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={ciIcon} alt="CI/CD" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-green-400 transition-colors">CI/CD</h3>
                  </div>
                </div>
              </div>

              {/* Tailwind CSS */}
              <div class="skill-card group relative">
                <div class="skill-card-inner relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500">
                  <div class="skill-glow absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>
                  <div class="skill-content relative z-10 text-center">
                    <div class="skill-icon-wrapper mb-4 mx-auto w-16 h-16 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src={tailwindIcon} alt="Tailwind CSS" class="w-12 h-12 object-contain" />
                    </div>
                    <h3 class="skill-title font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">Tailwind CSS</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div class="relative z-10 container mx-auto px-6 pt-20 pb-10">
        <div class="skills-header text-center max-w-4xl mx-auto">
          <div class="flex items-center justify-center mb-6">
            <div class="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <h3 class="mx-4 font-semibold tracking-[0.3rem] text-gray-400 uppercase text-sm">
              Learning Journey
            </h3>
            <div class="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Experience & Education
          </h1>
          <div class="description-section max-w-3xl mx-auto">
            <p
              ref={journeyTextRef}
              class="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
              For 1+ years, I have been continuously learning in the field of
              front-end and experimenting with new technologies and
              frameworks. I'm passionate about creating beautiful, performant,
              and user-friendly web experiences.
            </p>
          </div>
        </div>
      </div>

   

      {/* Progress Bar */}
      <div class="relative z-20 w-full h-1 bg-gray-800">
        <div 
          ref={progressBarRef}
          class="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 w-0"
        ></div>
      </div>

      {/* Timeline Section */}
      <div 
        ref={timelineRef}
        class="relative z-10 flex items-center h-screen gap-24 px-20"
        style={`width: ${educationData.length * 480}px`}>
        
        {/* Connecting Line */}
        <div class="absolute top-1/2 left-0 w-full h-px">
          <div class="w-full h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-teal-500/50"></div>
          {/* Timeline dots - positioned in center between cards */}
          <For each={educationData}>
            {(_, index) => (
              <div 
                class="absolute top-1/2 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white shadow-lg"
                style={`left: calc(${index() * 480}px + 160px); transform: translateY(-50%);`}>
                <div class="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            )}
          </For>
        </div>

        <For each={educationData}>
          {(item, index) => (
            <div 
              class="timeline-card flex-shrink-0 w-80"
              classList={{
                "self-start mt-20": index() % 2 === 0,
                "self-end mb-20": index() % 2 === 1,
              }}>
              
              {/* Card */}
              <div class="group relative">
                {/* Glow effect */}
                <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                
                {/* Main card */}
                <div class="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 min-h-[220px] max-h-[220px] flex flex-col">
                  
                  {/* Top content */}
                  <div class="flex-1">
                    {/* Date badge */}
                    <div class="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 mb-4">
                      <div class="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                      <span class="text-cyan-400 text-xs font-medium">{item.years}</span>
                    </div>

                    {/* Content */}
                    <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p class="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>



                  {/* Card number */}
                  <div class="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {String(index() + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
