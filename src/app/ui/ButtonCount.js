import React, { useState } from "react";

export const ButtonCount = ({onCount, count, maximumAmountPerWallet}) => {
  
  return (
    <div className="custom-btn custom-btn1 flex justify-around w-[195px] h-[55px] rounded-lg border-white items-center border-solid border-2 text-3xl">
      <div
        className="cursor-pointer"
        onClick={() => {
          count != 1 && onCount(false);
        }}
      >
        
<svg width="34" height="34" viewBox="0 0 34 34" fill="none">
<path d="M26.5033 16.6971H7.46943" stroke="white" strokeWidth="2.03935" strokeLinecap="round"/>
</svg>

      </div>
      <div>{count}</div>

      <div
        className="cursor-pointer"
        onClick={() => {
          count != maximumAmountPerWallet && onCount(true);
        }}
      >
        
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7855 7.18011L16.7855 26.214" stroke="white" strokeWidth="2.03935" strokeLinecap="round"/>
<path d="M26.3025 16.6971H7.26855" stroke="white" strokeWidth="2.03935" strokeLinecap="round"/>
</svg>

      </div>
    </div>
  );
};
