import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2>Politique de Confidentialité</h2>

        <section>
          <h3>Collecte des Données</h3>
          <p>
            Anime Mania Shop collecte et traite les informations suivantes :
          </p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse de livraison</li>
            <li>Numéro de téléphone</li>
          </ul>
        </section>

        <section>
          <h3>Utilisation des Données</h3>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul>
            <li>Traitement des commandes</li>
            <li>Les vendres sur snap</li>
            <li>Communication commerciale</li>
            <li>Amélioration de nos services</li>
          </ul>
        </section>

        <section>
          <h3>Vos Droits</h3>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d'accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
