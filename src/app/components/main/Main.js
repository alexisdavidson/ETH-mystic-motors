import React from "react";
import { Roulette } from "../roulette/Roulette";
import style from "./Main.module.css";
export const Main = () => {
  return (
    <main className={`flex h-full flex-1 bg-black ${style.bg} relative`}>
      <div className="home-main-wrapper mt-[20px] flex flex-col justify-center items-center mx-auto text-white relative z-10 text-center sm:w-[95%]">
        <div className="text-lg mb-1 time-title">Time Left Until Mint:</div>
        <div className="text-4xl mb-[10px] time">122 <span className="colorgray">:</span> 45 <span className="colorgray">:</span> 12 <span className="colorgray">:</span> 12</div>
        <div className="title text-5xl mb-[10px] sm:text-3xl xs:text-2xl">
        Phase 1 Genesis Collection
        </div>
        <div className="subtitle text-xl sm:text-base xs:text-base">
        Mystic Motors is a digital play-to-earn NFT based game that provides a virtual racing experience that results in rewards, rivalries and champions.
        </div>
        <div className="flex text-white text-xl mt-[35px] justify-center progress-bar-text">
          <div className="">350</div>
          <div className=" opacity-50">/500 Minted</div>
        </div>
        <div className="w-[878px] sm:w-[80%] h-[10px] gray-progress-bar bg-black relative mt-[15px]">
          <div
            className={`h-full blue-progress-bar bg-blue-500 w-[75%] absolute z-10 ${style.bord}`}
          ></div>
        </div>

        <Roulette />
      </div>
    </main>
  );
};