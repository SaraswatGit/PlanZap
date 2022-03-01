import React from "react";
import Confetti from "react-confetti";

export default function ConfettiCeleb() {
  const confetti = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
  };

  return (
    <div style={confetti}>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        friction={0.99}
        opacity={0.9}
        gravity={0.1}
        tweenDuration={2500}
        recycle={false}
      />
    </div>
  );
}
