import React from "react";
import logo from "../images/logo.png";
import discordIcon from "../images/discordIcon.png";
import telegramIcon from "../images/telegramIcon.png";
import twitterIcon from "../images/twitterIcon.png";
import youtubeIcon from "../images/youtube.png";
import openseaIcon from "../images/OpenSea-gray.png";
import instIcon from "../images/instIcon.png";
import { FooterItem } from "../ui/FooterItem";
import { SocialLink } from "../ui/SocialLink";
export const Footer = () => {
  return (
    <div className="footer-wrapperinner max-h-[95px] lg:max-h-full 2xl:px-6 px-12 bg-[#1C1C1C]  mt-auto relative z-10 lg:flex-col lg:py-4 items-center grid grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
      <div className="logo flex space-x-5  lg:w-full lg:justify-evenly ">
        <img className=" " src={logo} alt="logo" />
      </div>

      <div className="copy-right-text copy-right-text-desktop text-center text-white sm:text-sm xs:text-xs lg:my-3 lg:row-start-3 lg:row-end-4 lg:mt-9 xl:text-sm lg:text-base">
        Copyright ©2023 Mystic Motors, All rights reserved.
      </div>
      <div>
      <div className="social-icon flex lg:mt-[25px] justify-end items-center footer-icon-wrapper">
        <SocialLink img={discordIcon} link="https://Discord.gg/mysticmotors" />
        <SocialLink
          img={instIcon}
          link="https://www.instagram.com/MysticMotorsNFT/"
        />
        <SocialLink
          img={openseaIcon}
          link="https://opensea.io/collection/mysticmotorsnft"
        />
        <SocialLink
          img={twitterIcon}
          link="https://twitter.com/MysticMotorsNFT"
        />
      </div>
      <div className="copy-right-text-mobile copy-right-text text-center text-white sm:text-sm xs:text-xs lg:my-3 lg:row-start-3 lg:row-end-4 lg:mt-3 xl:text-sm lg:text-base">
        Copyright ©2023 Mystic Motors, All rights reserved.
      </div>
      </div>
      <div className="collection-text-mobile copy-right-text text-center ">
      <a href="#">GENESIS<br></br>
COLLECTION</a>
      </div>

    </div>
  );
};
