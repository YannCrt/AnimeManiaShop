"use client"

import { useAuth } from "../contexte/auth"; // Assurez-vous que l'import est correct
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { isAuthenticated, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  console.log("isAuthenticated:", isAuthenticated);  // Debugging
  console.log("loading:", loading);  // Debugging

  if (loading) {
    return <div>Loading...</div>;  // Ou ton indicateur personnalisé
  }

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

      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${mobileMenuOpen ? "show-mobile-menu" : ""}`}>
        <ul>

          <li>
            <Link href="/shop" className="nav-link">
              <span className="nav-link-text">Shop</span>
            </Link>
          </li>

          {/* Affichage conditionnel basé sur isAuthenticated */}
          {!loading && (
            <>
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
            </>
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
