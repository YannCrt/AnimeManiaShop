"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth", { cache: "no-store" });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification :",
          error
        );
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="navbar">
      <div className="nav-img">
        <Link href="/">
          <Image src="/logo.jpg" width={100} height={90} alt="Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <Link href="#search">Rechercher</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/profil">Mon profil</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Se connecter</Link>
              </li>
            </>
          )}
          <li>
            <Link href="/cart">Mon Panier</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
