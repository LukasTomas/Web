import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import ShoppingCart from "./ShoppingCart";

interface Props {
  mainNav: {
    name: string;
    href: string;
  }[];
  shoppingCartInfo: {
    name: string;
    href: string;
  };
}

function Header({ mainNav, shoppingCartInfo }: Props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Navbar options={mainNav} />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <ShoppingCart
            name={shoppingCartInfo.name}
            href={shoppingCartInfo.href}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
