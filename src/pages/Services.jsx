import React from "react";
import "./services.css";
import Fade from 'react-reveal/Fade';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <div className="main-container">
        <Fade bottom>
          <h1 className="title">Our Services</h1>
        </Fade>
        <div className="attribution">
          <Fade bottom>
            <p className="highlight bold">
              UI and Animation by - {" "}
              <a href="https://www.instagram.com/_aapashpdn/" target="_blank" rel="noopener noreferrer">Aapash Pradhan</a>
            </p>
          </Fade>
          <Fade bottom delay={200}>
            <p className="highlight bold">
              Backend, Redux, Logic, Database by - {" "}
              <a href="https://www.instagram.com/jeen_mhrzn/" target="_blank" rel="noopener noreferrer">Jeen Maharjan</a>
            </p>
          </Fade>
        </div>
        <Fade bottom>
          <p className="description">
            Welcome to Mero Pasal! We take great pride in presenting our website, where we offer a wide range of services. At Mero Pasal, customer satisfaction is our topmost priority, and we strive to provide the best experience to our valued customers.
          </p>
        </Fade>
        <Fade bottom>
          <p className="description">
            Join us at Mero Pasal and experience a user-friendly platform that is dedicated to customer satisfaction. We are here to serve you and provide a seamless online shopping experience like never before.
          </p>
        </Fade>
      </div>
      <Fade bottom>
        <h2 className="services-heading">
  Some of Our Special Services: <span className="highlight">( And please use valid email when registeration )</span>
</h2>
      </Fade>
      <div className="services-container">
        <Fade bottom cascade>
          <div className="service">
            <h2>Discount Coupon</h2>
            <ul className="list">
              <li className="list-item">Coupon send by admin is One Time use coupon</li>
              <li className="list-item">You have to use only your coupon otherwise error message will be shown</li>
              <li className="list-item">You have to be a registered user.</li>
              <li className="list-item">Make an order of more than 3 lakhs or make sales of 10 lakhs to get coupon.</li>
              <li className="list-item">If u are considered trustworthy by admin</li>
            </ul>
          </div>
        </Fade>
        <Fade bottom cascade>
          <div className="service">
            <h2>Notification</h2>
            <ul className="list">
              <li className="list-item">Receive notifications when:</li>
              <li className="list-item">Someone places a bid on your product.</li>
              <li className="list-item">You receive a discount coupon from the admin.</li>
              <li className="list-item">Your product is deleted by a user.</li>
              <li className="list-item">Once you click the notification it will be marked as read</li>
            </ul>
          </div>
        </Fade>
        <Fade bottom cascade>
          <div className="service">
            <h2>Chat System</h2>
            <ul className="list">
              <li className="list-item">Admin is marked with shield sign</li>
              <li className="list-item">You can always message to admin if there is any problem</li>
              <li className="list-item">You can message the user to get detail query on products etc</li>
              
            </ul>
          </div>
        </Fade>
        <Fade bottom cascade>
          <div className="service">
            <h2>Bidding</h2>
            <ul className="list">
              <li className="list-item">You cannot bid on the product if it is brand new</li>
              <li className="list-item">You have to get logged in to bid</li>
              <li className="list-item">You cannot bid on your own product</li>
              
            </ul>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ServicesPage;
