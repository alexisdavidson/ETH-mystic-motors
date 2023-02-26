import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./main/Main";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <Main mintEnabled={false}/>
            <Footer />
          </div>
        } />
        <Route path="/test" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <Main mintEnabled={true} />
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};
