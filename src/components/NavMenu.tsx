import useLenis from "../lib/useLenis";

interface NavMenuProps {
  navActive: boolean;
  toggleNav: () => void;
}

export function NavMenu(props: NavMenuProps) {
  const { scrollTo } = useLenis();

  return (
    <nav
      class={`fixed lg:-top-2 top-0 right-0 h-screen w-2/3 bg-white border-l-2 border-gray-100 transform ${
        props.navActive ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-200 ease-in-out z-50 lg:relative lg:h-auto lg:w-auto lg:flex lg:items-center lg:justify-center lg:border-none`}>
      <ul class="flex flex-col h-full justify-center space-y-8 text-center lg:flex-row lg:space-y-0 lg:space-x-12 -ml-9">
        <li>
          <a
            href="#hero"
            onclick={() => scrollTo("#hero")}
            class="text-gray-800 relative group">
            <span>Home</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a
            href="#about"
            onclick={() => scrollTo("#about")}
            class="text-gray-800 relative group">
            <span>About</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a
            href="#portfolios"
            onclick={() => scrollTo("#portfolios")}
            class="text-gray-800 relative group">
            <span>Portfolio</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a
            href="#skills"
            onclick={() => scrollTo("#skills")}
            class="text-gray-800 relative group">
            <span>Skills</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onclick={() => scrollTo("#contact")}
            class="text-gray-800 relative group">
            <span>Contact</span>
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
