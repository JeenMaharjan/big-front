import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
          History
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/myproducts" className="nav-link">
          My Products
        </Link>
      </li>


      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link">
          Wishlist
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/chat" className="nav-link">
          Chat
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/services" className="nav-link">
          Services
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;