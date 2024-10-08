import type { Component } from "solid-js";
import { Header } from "../components/Header";
import { About } from "./About";
import { Portfolios } from "./Portofolio";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { Footer } from "../components/Footer";
import { ScrollUp } from "../components/ScrollUp";

const App: Component = () => {
  return (
    <main class="w-full overflow-hidden">
      <div class="container mx-auto flex flex-col items-center">
        <Header />
        <section id="about">
          <About />
        </section>
        <section id="portfolios">
          <Portfolios />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </div>
      <ScrollUp />
    </main>
  );
};

export default App;
