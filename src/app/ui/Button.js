import React from "react";

export const Button = ({ text, handler, none }) => {
  return (
    <div
      onClick={handler}
      className={`
      ${none && "lg:hidden"}
      w-[195px]
       bg-[#F4F4F4]
        h-[55px]
        custom-btn
        custom-btn2
        rounded-lg
        overflow-hidden 
        flex items-center
        justify-center
        text-[#0C0C0C]
        text-xl font-normal
        cursor-pointer
        hover:bg-opacity-75`}
    >
      {text}
    </div>
  );
};
