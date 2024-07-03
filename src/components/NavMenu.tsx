import { onMount } from "solid-js";
import { menu } from "../mapping";
import useLenis, { UseLenisResult } from "../lib/useLenis";
import AOS from "aos";
import "aos/dist/aos.css";

interface NavMenuProps {
  navActive: boolean;
  toggleNav: () => void;
}

export function NavMenu(props: NavMenuProps) {
  const { scrollTo } = useLenis() as UseLenisResult;

  onMount(() => {
    AOS.init({
      once: true,
    });
  });

  return (
    <nav
      class={`fixed lg:-top-2 top-0 right-0 h-screen w-2/3 bg-white border-l-2 border-gray-100 transform ${
        props.navActive ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-200 ease-in-out z-50 lg:relative lg:h-auto lg:w-auto lg:flex lg:items-center lg:justify-center lg:border-none`}>
      <ul
        class="flex flex-col h-full justify-center space-y-8 text-center lg:flex-row lg:space-y-0 lg:space-x-12 -ml-9"
        data-aos={props.navActive ? "fade-left" : "fade-down"}
        data-aos-duration={props.navActive ? "800" : ""}>
        {menu.map((item) => (
          <li>
            <a
              href={item.hash}
              onclick={() => {
                scrollTo(item.hash);
                if (props.navActive) {
                  AOS.refresh();
                }
              }}
              class="text-gray-800 relative group"
              data-aos={props.navActive ? "fade-left" : ""}>
              <span>{item.name}</span>
              <span class="absolute inset-x-0 bottom-0 h-0.5 bg-iconColors-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
