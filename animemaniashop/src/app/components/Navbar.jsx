"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexte/auth";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-img">
        <Link href="/">
          <Image
            src="/logo.jpg"
            width={100}
            height={90}
            alt="Logo"
            className="logo-image"
          />
        </Link>
      </div>

      {/* Hamburger menu pour mobile */}
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${mobileMenuOpen ? "show-mobile-menu" : ""}`}>
        <ul>
          <li>
            <Link href="#search" className="nav-link">
              <span className="nav-link-text">Rechercher</span>
            </Link>
          </li>
          <li>
            <Link href="/shop" className="nav-link">
              <span className="nav-link-text">Shop</span>
            </Link>
          </li>

          {isAuthenticated ? (
            <li>
              <Link href="/profil" className="nav-link">
                <span className="nav-link-text">Mon profil</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login" className="nav-link">
                <span className="nav-link-text">Se connecter</span>
              </Link>
            </li>
          )}
          <li>
            <Link href="/cart" className="nav-link cart-link">
              <span className="nav-link-text">Mon Panier</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
