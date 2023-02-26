import React, { useEffect, useState } from "react";
import home from "../images/home.png";
import play from "../images/Play.png";
import group from "../images/Group.png";
import roadmap from "../images/roadmap.png";
import team from "../images/team.png";
import { NavItem } from "../ui/navItem";

export const Burger = () => {
  const [isShow, setShow] = useState(false);
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isShow]);

  return (
    <div className="lg:block hidden">
      <div
        onClick={() => setShow(!isShow)}
        className="w-[20px] h-[20px] flex flex-col justify-evenly cursor-pointer relative z-40"
      >
        <div
          className={`h-[2px] w-full bg-white transition-all origin-top-left ${
            isShow && "rotate-[36deg]"
          }`}
        ></div>
        <div
          className={`h-[2px] w-full bg-white transition-all ${
            isShow && "opacity-0"
          }`}
        ></div>
        <div
          className={`h-[2px] w-full bg-white transition-all origin-bottom-left ${
            isShow && "-rotate-[36deg]"
          }`}
        ></div>
      </div>
      {isShow && (
        <div className="w-screen h-screen  bg-[rgba(0,0,0,0.9)] absolute top-0 left-0 z-30  overflow-auto">
          <div className="h-fit flex flex-col justify-center items-center py-5">
            <div className="my-[20px]">
              <NavItem href={"#"} img={home} text="MINT" />
            </div>
            <div className="my-[20px]">
              <NavItem href={"https://mysticmotors.io/#trailer"} img={play} text="Trailer" />
            </div>
            <div className="my-[20px]">
              <NavItem href={"https://mysticmotors.io/#sec2"} img={group} text="Description" />
            </div>
            <div className="my-[20px]">
              <NavItem href={"https://mysticmotors.io/#rdmap"} img={roadmap} text="Roadmap" />
            </div>
            <div className="my-[20px]">
              <NavItem href={"https://mysticmotors.io/#team"} img={team} text="Team" />
            </div> 
          </div>
        </div> 
      )}
    </div>
  );
};
