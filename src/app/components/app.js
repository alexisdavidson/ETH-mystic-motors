import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./main/Main";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from "react-router-dom"

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main mintEnabled={true}/>
      <Footer />
    </div>
  );
};
