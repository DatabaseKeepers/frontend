import React from "react";

export default function Banner( {text} ) {

  const greetingStyle = {
    paddingLeft: "50px",
    backgroundColor: "#7749F8",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: "white",
    height: "200px",
    display: "flex",
    alignItems: "center",
    fontSize: "50px",
  };

  return <div style={greetingStyle}>{text}</div>;
}
