import React from "react";

export const SocialLink = ({ img, link }) => {
  return (
    <a className="hover:opacity-75" href={link} target="blank">
      <img
        className="object-cover"
        width={32}
        height={32}
        src={img}
        alt={img}
      />
    </a>
  );
};
