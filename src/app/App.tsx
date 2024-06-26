import type { Component } from "solid-js";
import { Header } from "../components/Header";
import About from "./About";
import Portfolios from "./Portofolio";
import { Skills } from "./Skills";

const App: Component = () => {
  return (
    <main class="container flex flex-col items-center w-full max-w-screen-xl mx-auto px-4">
      <Header />
      <About />
      <Portfolios />
      <Skills/>
    </main>
  );
};

export default App;
