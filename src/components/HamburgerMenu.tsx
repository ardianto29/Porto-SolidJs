interface HamburgerMenuProps {
  navActive: boolean;
  toggleNav: () => void;
}

export function HamburgerMenu(props: HamburgerMenuProps) {
  return (
    <div
      class="lg:hidden z-50 cursor-pointer fixed top-8 right-6 w-12 h-12 flex flex-col justify-center items-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group"
      onClick={props.toggleNav}
    >
      {/* Hamburger lines */}
      <div class="relative w-6 h-4 flex flex-col justify-between">
        <div
          class={`w-full h-0.5 bg-gray-700 transform transition-all duration-300 ease-out ${
            props.navActive 
              ? "rotate-45 translate-y-1.5 bg-blue-600" 
              : "group-hover:bg-blue-600"
          }`}
        ></div>
        
        <div
          class={`w-full h-0.5 bg-gray-700 transition-all duration-300 ease-out ${
            props.navActive 
              ? "opacity-0 scale-0" 
              : "group-hover:bg-blue-600"
          }`}
        ></div>
        
        <div
          class={`w-full h-0.5 bg-gray-700 transform transition-all duration-300 ease-out ${
            props.navActive 
              ? "-rotate-45 -translate-y-1.5 bg-blue-600" 
              : "group-hover:bg-blue-600"
          }`}
        ></div>
      </div>

      {/* Ripple effect */}
      <div class="absolute inset-0 rounded-full bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
    </div>
  );
}
