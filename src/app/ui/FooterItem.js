import React from "react";

export const FooterItem = ({ img, text }) => {
  return (
    <div className="flex items-center text-white cursor-pointer hover:opacity-75 xl:text-sm">
      <img src={img} alt={img} />
      <div className="pl-2">{text}</div>
    </div>
  );
};
