import type { Component } from "solid-js";
import { Header } from "../components/Header";
import { About } from "./About";
import Portfolios from "./Portofolio";
import Skills from "./Skills";
import { Contact } from "./Contact";

const App: Component = () => {
  return (
    <main class="w-full overflow-hidden">
      <div class="container mx-auto flex flex-col items-center">
        <Header />
        <About />
        <Portfolios />
        <Skills />
        <Contact />
      </div>
    </main>
  );
};

export default App;
