import { portfolios } from "../mapping/index";
import { For } from "solid-js";

export default function Portfolios() {
  return (
    <section class="container mx-auto">
      <div class="flex items-center justify-start pt-24 ">
        <div class="w-5 h-px text-textColors-secondary mr-2 md:mr-4"></div>
        <h3 class="font-normal tracking-[0.5rem] text-textColors-secondary uppercase">
          My Works
        </h3>
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-start text-textColors-primary mt-2">
        Featured Portfolios
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <For each={portfolios}>
          {(portfolio, _) => (
            <div class="relative rounded-xl overflow-hidden border border-solid border-borderColors mt-14 shadow-lg">
              <div class="h-[250px] relative overflow-hidden">
                <img
                  src={portfolio.image}
                  alt={portfolio.title}
                  class="w-full h-auto object-cover block"
                />
              </div>
              <div class="p-5">
                <div class="flex justify-between items-center">
                  <h4 class="font-medium text-base text-textColors-primary ml-5">
                    {portfolio.title}
                  </h4>
                  <a
                    href={portfolio.link}
                    class="text-black group hover:text-iconColors-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      class="fill-current">
                      <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z" />
                    </svg>
                  </a>
                </div>
                <div class="flex flex-wrap gap-4 mt-8">
                  <For each={portfolio.tags}>
                    {(tag, _) => (
                      <div class="text-sm border border-solid border-gray-300 px-4 py-2 text-secondary max-w-full">
                        {tag}
                      </div>
                    )}
                  </For>
                </div>
                <p class="text-lg text-textColors-secondary mt-7">
                  {portfolio.description}
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
