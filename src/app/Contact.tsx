import { JSX } from "solid-js";
import { Button } from "../components/Button";

export function Contact(): JSX.Element {
  return (
    <section id="contact" class="container mx-auto p-7">
      <div class="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-32 mt-10">
        <form
          action="https://formspree.io/f/xeqwdykj"
          method="post"
          class="space-y-6">
          <input
            type="text"
            placeholder="Name"
            name="name"
            class="w-full p-3 bg-gray-100 border border-gray-300 rounded-md resize-none placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            class="w-full p-3 bg-gray-100 border border-gray-300 rounded-md resize-none placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Message"
            class="w-full p-3 bg-gray-100 border border-gray-300 rounded-md resize-none placeholder-gray-500 focus:outline-none focus:border-gray-400"></textarea>
          <Button variant="submit">Send Message</Button>
        </form>

        <div class="flex flex-col gap-6 space-y-10">
          <div class="flex items-center space-x-7">
            <div class="bg-backgroundColors-third w-14 h-14 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                class="fill-current text-iconColors-primary">
                <path d="M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z" />
              </svg>
            </div>
            <div class="space-y-1">
              <h4 class="font-semibold text-lg text-textColors-primary">
                Address
              </h4>
              <p>Sleman, DI Yogyakarta</p>
            </div>
          </div>

          <div class="flex items-center space-x-7">
            <div class="bg-backgroundColors-third w-14 h-14 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                class="fill-current text-iconColors-primary">
                <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
              </svg>
            </div>
            <div class="space-y-1">
              <h4 class="font-semibold text-lg text-textColors-primary">
                Phone
              </h4>
              <p>(0123)456789</p>
            </div>
          </div>

          <div class="flex items-center space-x-7">
            <div class="bg-backgroundColors-third w-14 h-14 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                class="fill-current text-iconColors-primary">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
              </svg>
            </div>
            <div class="space-y-1">
              <h4 class="font-semibold text-lg text-textColors-primary">
                Email
              </h4>
              <p>ardiantoramadhan83@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
