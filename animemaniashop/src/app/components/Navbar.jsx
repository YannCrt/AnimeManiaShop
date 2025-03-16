import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-img">
        <a href="/">
          <Image src="/logo.jpg" width={100} height={90} alt="P" />
        </a>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <a href="#search">Rechercher</a>
          </li>
          <li>
            <a href="/login">Se connecter</a>
          </li>
          <li>
            <a href="/cart">Mon Panier</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
