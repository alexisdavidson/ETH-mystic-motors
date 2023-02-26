import car1 from "../images/car1.png";
import car2 from "../images/car2.png";
import car3 from "../images/car3.png";
import car4 from "../images/car4.png";
import car5 from "../images/car5.png";
import car6 from "../images/car6.png";
import car7 from "../images/car7.png";

import carMobile1 from "../images/carMobile1.png";
import carMobile2 from "../images/carMobile2.png";
import carMobile3 from "../images/carMobile3.png";

export const GenerateArray = (arrs, tokenId) => {
  const car8 = "https://bafybeiculcjgv335ginl3wv2fgxvsmf4s6ifie3nzdvmr32i3vwjcmdj4u.ipfs.nftstorage.link/" + tokenId + ".jpg"
  const item = [car1, car2, car3, car4, car5, car6, car7, car8];
  const itemsMobile = [
    carMobile1,
    carMobile2,
    carMobile3,
    carMobile2,
    carMobile1,
    carMobile3,
    carMobile3,
  ];
  const items = window.innerWidth < 767 ? itemsMobile : item;
  const gh = [];
  for (let i = 0; i < arrs.length; i++) {
    const random = Math.floor(Math.random() * 7);
    gh.push(items[random]);
  }
  return gh;
};
