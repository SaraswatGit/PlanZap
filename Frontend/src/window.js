import { useEffect, useState } from "react";
import App from "./App";
import image from "./Context/—Pngtree—mobile frame png image and_6631525.png";
import arrow from "./Context/curved_arrow.png";
import "./CSSComponents/window.css";

function getWindowSize() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize());
  }, []);

  return windowSize;
}

function Component() {
  const { height, width } = useWindowSize();
  console.log(height); //This is for removing warning only
  if (width > 600) {
    return <App />;
  }
  return (
    <div className="Landscape">
      <img className="arrow" src={arrow} alt="" />
      <img className="phone" src={image} alt="" />
      <h1>Turn Your Device</h1>
      <p>Webiste is only available in Landscape mode</p>
    </div>
  );
}

export default Component;
