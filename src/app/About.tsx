import { onMount, createSignal, onCleanup } from "solid-js";

export function About() {
  const [isVisible, setIsVisible] = createSignal(false);
  const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = createSignal(-1);

  onMount(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    // Mouse tracking for interactive effects - optimized for responsiveness
    let currentX = 0;
    let currentY = 0;
    let raf: number;

    const handleMouseMove = (e: MouseEvent) => {
      currentX = e.clientX;
      currentY = e.clientY;
      
      // Cancel previous animation frame
      if (raf) {
        cancelAnimationFrame(raf);
      }
      
      // Use requestAnimationFrame for smooth updates
      raf = requestAnimationFrame(() => {
        setMousePosition({ x: currentX, y: currentY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    onCleanup(() => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    });
  });

  return (
    <section
      id="about"
      class="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-black"
      style="margin-bottom: 0; padding-top: 2.5rem;">
      
      {/* Dynamic Background */}
      <div class="absolute inset-0">
        {/* Main gradient */}
        <div class="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-black"></div>
        
        {/* Animated orbs */}
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl animate-bounce delay-2000"></div>
        
        {/* Floating particles */}
        <div class="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              class={`absolute w-1 h-1 bg-white/30 rounded-full animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                'animation-delay': `${Math.random() * 3}s`,
                'animation-duration': `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div class="absolute inset-0 opacity-5">
          <svg width="100" height="100" class="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="aboutGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutGrid)" />
          </svg>
        </div>
      </div>

      {/* Mouse follower effect */}
      <div 
        class="fixed w-80 h-80 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none z-10"
        style={{
          left: `${mousePosition().x - 160}px`,
          top: `${mousePosition().y - 160}px`,
          transform: 'translate3d(0, 0, 0)', // Hardware acceleration
        }}
      />

      <div class={`relative z-20 container mx-auto px-6 max-w-7xl transition-all duration-1000 ${
        isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        
        {/* Header Section */}
        <div class="text-center mb-20 mt-8">
          <div class={`inline-flex items-center gap-4 mb-10 transition-all duration-1000 delay-200 ${
            isVisible() ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div class="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-cyan-400"></div>
            <span class="px-4 py-2 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm text-purple-300 text-sm font-light tracking-[0.2rem] uppercase">
              Introduction
            </span>
            <div class="w-16 h-px bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent"></div>
          </div>
          
          <h1 class={`text-6xl md:text-8xl font-black mb-6 transition-all duration-1200 delay-400 ${
            isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span class="bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span class="bg-gradient-to-r from-cyan-300 via-purple-300 to-white bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          
          <p class={`text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${
            isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Crafting digital experiences with passion and precision
          </p>
        </div>

        {/* Main Content Grid */}
        <div class="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Profile Section */}
          <div class="lg:col-span-5">
            <div class={`relative group transition-all duration-1000 delay-500 ${
              isVisible() ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-20 -rotate-6'
            }`}>
              
              {/* Main profile card */}
              <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-500/20 backdrop-blur-xl border border-white/10 p-8 hover:scale-105 transition-transform duration-500">
                
                {/* Profile image area */}
                <div class="flex justify-center mb-8">
                  <div class="relative">
                    <div class="w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center text-white text-6xl font-black shadow-2xl">
                      AR
                    </div>
                    
                    {/* Floating elements around profile */}
                    <div class="absolute -top-3 -right-3 w-6 h-6 bg-purple-500 rounded-full animate-bounce delay-300"></div>
                    <div class="absolute -bottom-3 -left-3 w-4 h-4 bg-cyan-500 rounded-full animate-bounce delay-700"></div>
                    <div class="absolute top-1/2 -right-6 w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
                
                {/* Profile info */}
                <div class="text-center space-y-4">
                  <h3 class="text-2xl font-bold text-white">Ardianto</h3>
                  <p class="text-purple-300 font-medium">Frontend Developer</p>
                  
                  {/* Status indicator */}
                 
                </div>
                
                {/* Decorative elements */}
                <div class="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                <div class="absolute bottom-4 left-4 w-3 h-3 bg-cyan-400 rounded-full opacity-60"></div>
              </div>
              
              {/* Background glow */}
              <div class="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/20 to-cyan-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 -z-10"></div>
            </div>
          </div>

          {/* Content Section */}
          <div class="lg:col-span-7 space-y-8">
            
            {/* Story Cards */}
            <div class="space-y-6">
              {[
                {
                  title: "Professional Journey",
                  content: "I am a passionate Website Developer with valuable experience at PT PLN as an electricity meter recording officer for 1 year, where I developed strong analytical and problem-solving skills.",
                  icon: "💼",
                  gradient: "from-purple-500/20 to-blue-500/20"
                },
                {
                  title: "Current Focus", 
                  content: "Currently pursuing my career as a Junior Front End Developer, focusing on creating innovative, user-friendly, and accessible web applications using modern technologies.",
                  icon: "🚀",
                  gradient: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  title: "Vision & Passion",
                  content: "I'm passionate about leveraging cutting-edge technologies to build exceptional digital experiences that make a real impact in users' lives and contribute to groundbreaking web projects.",
                  icon: "✨",
                  gradient: "from-cyan-500/20 to-purple-500/20"
                }
              ].map((item, index) => (
                <div 
                  class={`group relative p-6 rounded-2xl bg-gradient-to-r ${item.gradient} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer ${
                    isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 'transition-delay': `${500 + index * 150}ms` }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(-1)}
                >
                  <div class="flex items-start gap-4">
                    <div class="text-3xl">{item.icon}</div>
                    <div class="flex-1">
                      <h4 class="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p class="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {item.content}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div class={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    activeCard() === index ? 'opacity-100' : ''
                  }`}></div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div class="grid grid-cols-3 gap-4">
              {[
                { number: "2+", label: "Years Experience", color: "purple", bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/5", borderColor: "border-purple-500/20", hoverBorder: "hover:border-purple-400/40", textColor: "text-purple-400" },
                { number: "15+", label: "Projects Built", color: "blue", bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/5", borderColor: "border-blue-500/20", hoverBorder: "hover:border-blue-400/40", textColor: "text-blue-400" },
                { number: "24/7", label: "Available", color: "cyan", bgColor: "bg-gradient-to-br from-cyan-500/10 to-cyan-600/5", borderColor: "border-cyan-500/20", hoverBorder: "hover:border-cyan-400/40", textColor: "text-cyan-400" }
              ].map((stat, index) => (
                <div 
                  class={`text-center p-6 rounded-xl ${stat.bgColor} border ${stat.borderColor} ${stat.hoverBorder} hover:scale-105 transition-all duration-300 ${
                    isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ 'transition-delay': `${950 + index * 100}ms` }}
                >
                  <div class={`text-3xl font-black ${stat.textColor} mb-2`}>{stat.number}</div>
                  <div class="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* CTA Section */}
            <div class={`flex justify-center lg:justify-start transition-all duration-1000 delay-1300 ${
              isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
