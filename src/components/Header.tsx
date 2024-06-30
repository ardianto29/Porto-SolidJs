import { createSignal } from "solid-js";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavMenu } from "./NavMenu";

import imageHero from "../assets/images/hero.svg";

export function Header() {
  const [navActive, setNavActive] = createSignal(false);

  const toggleNav = () => {
    setNavActive(!navActive());
  };

  return (
    <header class="bg-white">
      <div class="container mx-auto py-6">
        <div
          class={`flex justify-between items-center p-4 md:border-b-2 ${
            navActive() ? "border-transparent" : "border-gray-200"
          }`}>
          <NavMenu navActive={navActive()} toggleNav={toggleNav} />
          <HamburgerMenu navActive={navActive()} toggleNav={toggleNav} />
        </div>

        <section
          id="hero"
          class="flex flex-col-reverse md:grid md:grid-cols-2 items-center h-auto md:h-[720px] p-4 md:p-0">
          <div class="text-center md:text-left mb-6 md:mb-0">
            <div class="flex items-center justify-center md:justify-start mb-4">
              <div class="w-7 h-px bg-gray-400 mr-2"></div>
              <h3 class="font-normal tracking-[0.5rem] text-textColors-secondary uppercase">
                My name is
              </h3>
            </div>

            <h1 class="text-3xl md:text-5xl font-bold mb-4 text-textColors-primary">
              Ardianto Tri <span class="text-iconColors-primary">Ramadhan</span>
            </h1>
            <p class="text-textColors-secondary text-base md:text-lg">
              a <b>front-end developer</b> who loves intuitive, clean, and
              modern UI design.
            </p>
          </div>
          <div class="flex justify-center md:justify-end mb-6 md:mb-0">
            <img
              src={imageHero}
              alt="Person Standing"
              class="w-full md:max-w-lg"
            />
          </div>
        </section>
      </div>
    </header>
  );
}
