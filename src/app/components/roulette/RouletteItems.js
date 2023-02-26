import React from "react";
import { RouletteItem } from "./RouletteItem";
import style from "./roulette.module.css";

export const RouletteItems = ({ items, refs }) => {
  return (
    <div
      ref={refs}
      className={`inline-flex  w-full h-full  ${style.transition}`}
    >
      {items.map((item, index) => (
        <RouletteItem key={index} img={item} opacity={index == 40 && "true"} />
      ))}
    </div>
  );
};
