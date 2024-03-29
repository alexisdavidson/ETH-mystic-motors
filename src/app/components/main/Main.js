import React from "react";
import {useEffect, useLayoutEffect, useRef, useState } from "react";
import { Roulette } from "../roulette/Roulette";
import style from "./Main.module.css";
import { Timer } from "./Timer"

export const Main = ({mintEnabled}) => {
  const [isSoldOut, setIsSoldOut] = useState(true); // set to true when soldout

  return (
    <main className={`flex h-full flex-1 bg-black relative`}>
      <video id="vid" loop muted autoPlay className={`${style.backgroundVideo}`}>
          <source src={"1.mp4"} type="video/mp4"/>
      </video>
      <div className={`${style.bg}`}></div>
      <div className="home-main-wrapper mt-[20px] flex flex-col justify-center items-center mx-auto text-white relative z-100 text-center sm:w-[95%]">
        {/* <div className="text-lg mb-1 time-title">Time Left Until Mint:</div> */}
        <Timer isSoldOut={isSoldOut} />
        {/* <div className="text-4xl mb-[10px] time">122 <span className="colorgray">:</span> 45 <span className="colorgray">:</span> 12 <span className="colorgray">:</span> 12</div> */}
        <div className="title text-5xl mb-[10px] sm:text-3xl xs:text-2xl">
        Phase 2 Olympus Collection
        </div>
        <div className="subtitle text-xl sm:text-base xs:text-base">
        Mystic Motors is a digital play-to-earn NFT based game that provides a virtual racing experience that results in rewards, rivalries and champions.
        </div>
        
          <Roulette mintEnabled={mintEnabled} isSoldOut={isSoldOut} setIsSoldOut={setIsSoldOut} />

      </div>
    </main>
  );
};