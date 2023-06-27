import React, { useState } from "react";
import Jumbotron from "../components/cards/Jumbotron.jsx";
import SubList from "../components/sub/SubList.jsx";
import NewArrivals from "../components/home/NewArrivals.jsx";
import BestSellers from "../components/home/BestSellers.jsx";
import CategoryList from "../components/category/CategoryList.jsx";
import cloud from "./cloud.png";
import online from "./online.png";
import pause from "./pause.png";
import plane from "./plane.png";
import play from "./play.png";

import "./homee.css";

const Home = () => {
  const [explore, setExplore] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    setIsPaused((prevState) => !prevState);
  };

  return (
    <>
      {explore ? (
        <>
          <div className="jumbotron text-danger h1 font-weight-bold text-center">
            <Jumbotron text={["Wellcome To Mero Pasal " , "Enjoy Shopping!!"]} />
          </div>
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">New Arrivals</h4>
          <NewArrivals />
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Best Sellers</h4>
          <BestSellers />
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Categories</h4>
          <CategoryList />
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Sub Categories</h4>
          <SubList />
        </>
      ) : (
        <div className="mainy">
          <div className="content">
            <button className="button1">
              <a onClick={() => setExplore(true)} style={{color : "#f5f5f5"}}>Explore</a>
            </button>
          </div>
          <img
            src={cloud}
            id="clouds"
            className={isPaused ? "paused" : ""}
          />
          <img src={plane} id="airplane" className={isPaused ? "paused" : ""} />
          <div id="package" className={isPaused ? "paused" : ""}>
            <img src={online} className="package1" />
            <img src={online} className="package2" />
            <img src={online} className="package3" />
          </div>
          {isPaused ? (<img
            src={play}
            id="myImg"
            onClick={handleClick}
            className={isPaused ? "paused" : ""}
          />) : (<img
            src={pause}
            id="myImg"
            onClick={handleClick}
            className={isPaused ? "paused" : ""}
          />)}
        </div>
      )}
    </>
  );
};

export default Home;
