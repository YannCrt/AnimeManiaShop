import React from "react";

const LegalNoticePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2>Mentions Légales</h2>
        <section>
          <h3>Informations de l'Entreprise</h3>
          <p>
            <strong>Nom :</strong> Anime Mania Shop
          </p>
          <p>
            <strong>Fondateurs :</strong> Yann Cretin & Santiago Naranjo Henao
            Grajales Ladino
          </p>
          <p>
            <strong>Siège Social :</strong> 42 Rue des Otakus, 75001 Paris
          </p>
          <p>
            <strong>Contact :</strong> contact@animemaniashop.com
          </p>
        </section>

        <section>
          <h3>Informations Légales</h3>
          <p>
            <strong>Forme Juridique :</strong> Société par Actions Simplifiée
          </p>
          <p>
            <strong>Capital Social :</strong> 10 000 €
          </p>
          <p>
            <strong>SIRET :</strong> 123 456 789 00015
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalNoticePage;
