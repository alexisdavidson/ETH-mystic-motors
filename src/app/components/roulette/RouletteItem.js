import React from "react";
import style from "./roulette.module.css";

export const RouletteItem = ({ img, is, opacity }) => {
  return (
    <div
      className={`shrink-0 mx-0 md:mx-[0px]  md:h-[92px] md:w-[93px] ${
        is && style.border
      } ${opacity && "opacity-70"} `}
    >
      <img className="slider-wrapper-item" src={img} alt={img} />
    </div>
  );
};
