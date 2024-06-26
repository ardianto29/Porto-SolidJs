import type { Component } from "solid-js";
import { Header } from "../components/Header";
import About from "./About";
import Portfolios from "./Portofolio";

const App: Component = () => {
  return (
    <main class="container flex flex-col items-center w-full max-w-screen-xl mx-auto px-4">
      <Header />
      <About />
      <Portfolios />
    </main>
  );
};

export default App;
