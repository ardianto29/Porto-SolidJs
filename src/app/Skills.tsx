import { educationData } from "../mapping";

export function Skills() {
  return (
    <section class="w-screen h-auto bg-backgroundColors-secondary ">
      <div class="container px-10 py-12 md:px-10 md:py-20 w-full">
        <div class="flex items-center justify-start">
          <div class="w-5 h-px bg-gray-400 mr-2 md:mr-3"></div>
          <h3 class="font-normal tracking-[0.5rem] text-textColors-secondary uppercase">
            Learning Path
          </h3>
        </div>
        <h1 class="text-3xl font-bold text-start text-textColors-primary mt-2">
          Experience & Education
        </h1>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-12">
          <div>
            {educationData.map((edu, index) => (
              <section class="flex gap-2 ">
                <div class="relative pt-0 pr-[1rem]">
                  <div class="w-[2px] h-32 bg-borderColors relative"> </div>
                  <div class="absolute top-0 left-[-5px] w-3 h-3 bg-borderColors rounded-full"></div>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-textColors-primary mb-1">
                    {edu.title}
                  </h4>
                  <p class="text-textColors-secondary">{edu.subtitle}</p>
                  <h4 class="text-lg font-medium text-textColors-secondary">
                    {edu.years}
                  </h4>
                </div>
              </section>
            ))}
          </div>
          <article class="font-normal text-base leading-7 text-textColors-secondary self-start">
            <p>
              For 1+ years, I have been continuously learning in the field of
              front-end and experimenting with new technologies and frameworks,
              and here you can see a summary of my skills. Field of front-end
              and experimenting with new technologies.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-[1fr,1fr] mt-6">
              <ul class="leading-8 p-4 list-disc">
                <li>React JS</li>
                <li>Node JS</li>
                <li>HTML</li>
                <li>React Native</li>
              </ul>

              <ul class="leading-8 p-4 list-disc">
                <li>CSS</li>
                <li>Tailwind CSS</li>
                <li>Typescript</li>
                <li>Next JS</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
