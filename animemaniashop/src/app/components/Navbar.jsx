import React from "react";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nav-img">
            <a href="/"><Image
              src="/logo.jpg"
              width={100}
              height={90}
              alt="P"
            />
            </a>
            </div>
            <div className="nav-links">
            <ul>
                <li><a href="/truc">Rechercher</a></li>
                <li><a href="/truc">Se connecter</a></li>
                <li><a href="/truc">Mon Panier</a></li>
            </ul>
            </div>
        </div>
    );
}

export default Navbar;