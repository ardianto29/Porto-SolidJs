import { createSignal, onMount } from "solid-js";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";
import imageHero from "../assets/images/hero.svg";

export function Header() {
  const [navActive, setNavActive] = createSignal(false);
  const [isScrolled, setIsScrolled] = createSignal(false);

  const toggleNav = () => {
    setNavActive(!navActive());
  };

  onMount(() => {
    // Header scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      <header class={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled() 
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-gray-200/50" 
          : "bg-transparent border-white/20"
      }`}>
        <div class="container mx-auto relative">
          <div class="flex justify-center items-center p-4 lg:px-8 lg:py-6 lg:relative">
            {/* Navigation in center */}
            <NavMenu navActive={navActive()} toggleNav={toggleNav} />
            
            {/* Hamburger menu positioned absolute on mobile */}
            <HamburgerMenu navActive={navActive()} toggleNav={toggleNav} />
          </div>
        </div>
      </header>

      <section id="hero" class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-20">
        {/* Background decorations */}
        <div class="absolute inset-0">
          <div class="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div class="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div class="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        </div>

        <div class="container mx-auto px-4 pt-32 lg:pt-20 relative z-10">
          <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Hero Content */}
            <div class="text-center lg:text-left space-y-8">
              {/* Main heading */}
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-600 tracking-[0.3em] uppercase animate-fade-in-up animation-delay-200">
                  Hello, I'm
                </h3>
                <h1 class="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in-up animation-delay-400">
                  <span class="text-gray-900">Ardianto Tri</span>
                  <br />
                  <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Ramadhan
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p class="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-600">
                A passionate <span class="font-bold text-gray-900">front-end developer</span> crafting 
                beautiful, intuitive, and modern digital experiences.
              </p>

              {/* CTA Buttons */}
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onclick={() => {
                    const portfolioSection = document.querySelector('#portfolio');
                    if (portfolioSection) {
                      portfolioSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <span class="flex items-center gap-2 justify-center">
                    View My Work
                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </button>
                
                <button 
                  onclick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  class="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-full border border-gray-200 hover:bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get In Touch
                </button>
              </div>

              {/* Social links */}
              <div class="flex gap-4 justify-center lg:justify-start">
                <div class="flex items-center gap-4">
                  <span class="text-sm text-gray-500">Follow me:</span>
                  <div class="flex gap-3">
                    <a 
                      href="#" 
                      class="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      class="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      class="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div class="flex justify-center lg:justify-end">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl transform rotate-6"></div>
                <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <img
                    src={imageHero}
                    alt="Ardianto Tri Ramadhan"
                    class="w-full max-w-md lg:max-w-lg filter drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div class="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
}

