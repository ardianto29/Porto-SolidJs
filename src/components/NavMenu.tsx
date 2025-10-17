import { onMount, createSignal } from "solid-js";
import { menu } from "../mapping";
import useLenis, { UseLenisResult } from "../lib/useLenis";

interface NavMenuProps {
  navActive: boolean;
  toggleNav: () => void;
}

export function NavMenu(props: NavMenuProps) {
  const { scrollTo } = useLenis() as UseLenisResult;
  const [activeMenu, setActiveMenu] = createSignal("Home"); // Default active menu

  const handleMenuClick = (item: any) => {
    setActiveMenu(item.name);
    scrollTo(item.hash);
    if (props.navActive) {
      props.toggleNav();
    }
  };

  return (
    <nav
      class={`fixed lg:-top-2 top-0 right-0 h-screen w-full sm:w-2/3 bg-white/95 backdrop-blur-lg border-l border-gray-200/50 transform ${
        props.navActive ? "translate-x-0" : "translate-x-full"
      } transition-all duration-300 ease-out z-40 lg:relative lg:h-auto lg:w-auto lg:flex lg:items-center lg:justify-center lg:border lg:border-gray-200/30 lg:bg-white/80 lg:backdrop-blur-sm lg:rounded-full lg:px-6 lg:py-3 lg:shadow-sm lg:translate-x-0`}>
      
      {/* Mobile menu background overlay */}
      <div class={`lg:hidden absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 ${props.navActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
      
      <ul class="relative flex flex-col h-full justify-center items-center space-y-8 text-center lg:flex-row lg:space-y-0 lg:space-x-6">
        {menu.map((item) => (
          <li class="group relative">
            <a
              href={item.hash}
              onclick={() => handleMenuClick(item)}
              class={`relative text-lg lg:text-sm font-medium transition-all duration-300 px-4 py-2 lg:px-4 lg:py-2 rounded-full ${
                activeMenu() === item.name 
                  ? "text-white" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <span class="relative z-10">{item.name}</span>
              
              {/* Active background with swipe animation */}
              <div class={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-700 ease-out ${
                activeMenu() === item.name 
                  ? "scale-x-100 opacity-100" 
                  : "scale-x-0 opacity-0"
              } transform origin-left`}></div>
              
              {/* Mobile touch effect */}
              <span class="lg:hidden absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></span>
            </a>
          </li>
        ))}
        
        {/* Mobile menu close button */}
        <li class="lg:hidden mt-12">
          <button 
            onClick={props.toggleNav}
            class="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Close Menu
          </button>
        </li>
      </ul>
    </nav>
  );
}
