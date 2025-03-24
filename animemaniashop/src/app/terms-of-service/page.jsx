import React from "react";

const TermsOfServicePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2>Conditions Générales d'Utilisation</h2>

        <section>
          <h3>Acceptation des Conditions</h3>
          <p>
            En utilisant Anime Mania Shop, vous acceptez les présentes
            conditions.
          </p>
        </section>

        <section>
          <h3>Utilisation du Site</h3>
          <ul>
            <li>Inscription requise pour les achats</li>
            <li>Respect des règles de la communauté</li>
            <li>Protection des données personnelles</li>
          </ul>
        </section>

        <section>
          <h3>Responsabilités</h3>
          <p>Anime Mania Shop ne peut être tenu responsable :</p>
          <ul>
            <li>Des contenus postés par les utilisateurs</li>
            <li>Des achats effectués</li>
            <li>Des problèmes techniques</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
