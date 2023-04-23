import React from "react";
import opensea from "../images/OpenSea.png";
export const SwitchLanguage = () => {
  return (
    <div className="openseabtn-wrapper ml-auto flex text-white mr-10 cursor-pointer">
      <div className="openseabtn"><a href="https://opensea.io/collection/mystic-motors-olympus" className="btn btn-primary"> <span className="icon"><img className="" src={opensea} alt="arrow-down" /></span><span>VIEW ON OPENSEA</span></a></div>
    </div>
  );
};
