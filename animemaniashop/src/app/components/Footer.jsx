import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="content-footer">
          <h2>Information</h2>
          <a href="/mentions-legales">-Mentions légales</a>
          <a href="/politique-de-confidentialite">
            -Politique de confidentialité
          </a>
          <a href="/conditions-generales-dutilisation">
            -Conditions générales d'utilisation
          </a>
        </div>

        <div className="content-footer">
          <h2>Contact</h2>
          <p>Santiago Naranjo Henao Grajales Ladino</p>
          <p>Email : contact@animemaniashop.com</p>
          <p>Téléphone : +33 6 56 80 29 29</p>
        </div>
      </div>
      <div className="copyright">
        <p>
          Copyright © 2025 Anime Mania Shop.{" "}
          <a href="/mentions-legales">-Mentions légales</a>{" "}
          <a href="/CGV">-Conditions générales de ventes</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
