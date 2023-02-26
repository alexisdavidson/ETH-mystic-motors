import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./main/Main";

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
