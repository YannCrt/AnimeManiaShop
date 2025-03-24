import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="content-footer">
          <h2>Information</h2>
          <ul>
            <li>
              <a href="/legal-notice">Mentions légales</a>
            </li>
            <li>
              <a href="/privacy-policy">Politique de confidentialité</a>
            </li>
            <li>
              <a href="/terms-of-service">Conditions générales d'utilisation</a>
            </li>
          </ul>
        </div>

        <div className="content-footer">
          <h2>Contact</h2>
          <p>Santiago Naranjo Henao Grajales Ladino</p>
          <p>
            Email:{" "}
            <a href="mailto:contact@animemaniashop.com">
              contact@animemaniashop.com
            </a>
          </p>
          <p>
            Téléphone: <a href="tel:+33656802929">+33 6 56 80 29 29</a>
          </p>
        </div>
      </div>

      <div className="copyright">
        <p>
          Copyright © 2025 Anime Mania Shop.
          <a href="/legal-notice"> Mentions légales</a> |
          <a href="/terms-of-sale"> Conditions générales de ventes</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
