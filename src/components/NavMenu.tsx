interface NavMenuProps {
  navActive: boolean;
  toggleNav: () => void;
}

export function NavMenu(props: NavMenuProps) {
  return (
    <nav
      class={`fixed -top-2 right-0 h-screen w-2/3 bg-white border-l-2 border-gray-100 transform ${
        props.navActive ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-200 ease-in-out z-50 md:relative md:h-auto md:w-auto md:flex md:items-center md:justify-center md:border-none`}>
      <ul class="flex flex-col h-full justify-center space-y-8 text-center md:flex-row md:space-y-0 md:space-x-12 ml-10">
        <li>
          <a href="#summary" class="text-gray-800 relative group">
            <span>About</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a href="#portfolios" class="text-gray-800 relative group">
            <span>Portfolio</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a href="#skills" class="text-gray-800 relative group">
            <span>Skills</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a href="#contact" class="text-gray-800 relative group">
            <span>Contact</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
