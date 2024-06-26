import { createSignal } from "solid-js";

function About() {
  return (
    <section class="w-screen h-auto justify-center bg-backgroundColors-secondary">
      <div class="container px-4 py-12 md:px-24 md:py-24 w-full">
        <div class="flex items-center justify-center">
          <div class="w-5 h-px bg-gray-400 mr-2 md:mr-3"></div>
          <h3 class="font-normal tracking-[0.5rem] text-textColors-secondary uppercase">
            Intro
          </h3>
        </div>
        <h1 class="text-3xl font-bold text-center text-textColors-primary p-1">
          About Me
        </h1>

        <article class="flex justify-center mt-6">
          <div class="bg-white text-gray-700 rounded-xl px-6 py-8 md:px-10 md:py-12 text-center shadow-lg">
            <p>
              I am a Website developer. Previously, I worked at PT PLN as an
              officer recording electricity meters for 1 year. Now, I am
              pursuing a career as a Junior Front End Developer with a focus on
              Website development. I am passionate about utilizing my skills to
              contribute to innovative website projects.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default About;
