import React, { useState, useEffect } from "react";
import AnimatedLetters from "./AnimatedLetters"; // Import your AnimatedLetters component

const HomeAnimation = () => {
  const [letterClass, setLetterClass] = useState("text-animate");

  const nameArray = ["B", "A", "L", "L"];
  const jobArray = ["C", "H", "A", "T "];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <h1>
      <br></br>

      <AnimatedLetters
        letterClass={letterClass}
        strArray={nameArray}
        idx={15}
      />
      <br />
      <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22} />
    </h1>
  );
};

export default HomeAnimation;
