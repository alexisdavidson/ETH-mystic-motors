import React from "react";
import logo from "../images/logo.png";
import home from "../images/home.png";
import play from "../images/Play.png";
import group from "../images/Group.png";
import roadmap from "../images/roadmap.png";
import team from "../images/team.png";
import { NavItem } from "../ui/navItem";
import { Button } from "../ui/Button";
import { SwitchLanguage } from "./SwitchLanguage";
import { Burger } from "./Burger";

export const Header = () => {
  return (
    <header className="max-h-[75px] 2xl:px-6 bg-[#1C1C1C] h-full flex px-12 items-center " style={{zIndex: "10"}}>
      <img className="pr-12 logo-image" src={logo} alt="logo" />
      <div className="flex lg:hidden header-nav">
        <NavItem href={"#"} img={home} text="MINT" />
        <NavItem href={"https://mysticmotors.io/#trailer"} img={play} text="Trailer" />
        <NavItem href={"https://mysticmotors.io/#sec2"} img={group} text="Description" />
        <NavItem href={"https://mysticmotors.io/#rdmap"} img={roadmap} text="Roadmap" />
        <NavItem href={"https://mysticmotors.io/#team"} img={team} text="Team" />
      </div>
      <SwitchLanguage />
      <Burger />
    </header>
  );
};
