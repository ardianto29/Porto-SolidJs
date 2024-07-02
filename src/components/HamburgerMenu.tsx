interface HamburgerMenuProps {
  navActive: boolean;
  toggleNav: () => void;
}

export function HamburgerMenu(props: HamburgerMenuProps) {
  return (
    <div
      class="lg:hidden z-50 cursor-pointer fixed top-10 right-7"
      onClick={props.toggleNav}>
      <div
        class={`w-6 h-0.5 bg-black mb-1.5 transform transition-transform ${
          props.navActive ? "rotate-45 translate-y-2" : ""
        }`}></div>
      <div
        class={`w-6 h-0.5 bg-black mb-1.5 transition-opacity ${
          props.navActive ? "opacity-0" : ""
        }`}></div>
      <div
        class={`w-6 h-0.5 bg-black transform transition-transform ${
          props.navActive ? "-rotate-45 -translate-y-2" : ""
        }`}></div>
    </div>
  );
}
