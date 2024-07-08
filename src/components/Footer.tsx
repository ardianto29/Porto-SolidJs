import { createSignal, onMount } from "solid-js";
import AOS from "aos";
import "aos/dist/aos.css";

export function Footer() {
  const [linkedinFill, setLinkedinFill] = createSignal("#3e3f40");
  const [githubFill, setGithubFill] = createSignal("#3e3f40");
  const [gitlabFill, setGitlabFill] = createSignal("#3e3f40");

  onMount(() => {
    AOS.init({
      once: false,
    });
  });

  return (
    <footer
      class="w-screen h-auto bg-backgroundColors-secondary text-center justify-center"
      data-aos="fade-up"
      data-aos-once="false">
      <div class="container p-16">
        <div class="flex justify-center mb-4">
          <a
            href="https://www.linkedin.com/in/ardianto-tri-ramadhan"
            target="_blank"
            class="mx-2"
            onMouseEnter={() => setLinkedinFill("#000")}
            onMouseLeave={() => setLinkedinFill("#3e3f40")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{ fill: linkedinFill() }}>
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
          <a
            href="https://github.com/ardianto29"
            target="_blank"
            class="mx-2"
            onMouseEnter={() => setGithubFill("#000")}
            onMouseLeave={() => setGithubFill("#3e3f40")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{ fill: githubFill() }}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://gitlab.com/ardiantoramadhan83"
            target="_blank"
            class="mx-2"
            onMouseEnter={() => setGitlabFill("#000")}
            onMouseLeave={() => setGitlabFill("#3e3f40")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="80 78 250 250"
              style={{ fill: gitlabFill() }}>
              <path d="M282.83,170.73l-.27-.69-26.14-68.22a6.81,6.81,0,0,0-2.69-3.24,7,7,0,0,0-8,.43,7,7,0,0,0-2.32,3.52l-17.65,54H154.29l-17.65-54A6.86,6.86,0,0,0,134.32,99a7,7,0,0,0-8-.43,6.87,6.87,0,0,0-2.69,3.24L97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82,19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91,40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z" />
            </svg>
          </a>
        </div>
        <p>&#169; 2024 - Made by Ardianto Tri Ramadhan</p>
      </div>
    </footer>
  );
}
