import type { Component } from "solid-js";
import { Header } from "../components/Header";
import { About } from "./About";
import { Portfolios } from "./Portofolio";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { Footer } from "../components/Footer";
import { ScrollUp } from "../components/ScrollUp";
import useLenis from "../lib/useLenis";

const App: Component = () => {
  // Initialize Lenis for smooth scrolling
  useLenis();

  return (
    <main class="w-full overflow-hidden" style="margin: 0; padding: 0;">
      <Header />
      <div class="w-full" style="margin: 0; padding: 0; display: block;">
        <About />
        <Portfolios />
        <Skills />
        <Contact />
        <Footer />
      </div>
      <ScrollUp />
    </main>
  );
};

export default App;
