import React from "react";

const SalesConditionsPage = () => {
  return (
    <div className="profile-container">
      <div className="profile-details">
        <h2>Conditions Générales de Vente</h2>

        <section>
          <h3>Commandes</h3>
          <p>
            Toute commande sur Anime Mania Shop implique l'acceptation des
            conditions suivantes :
          </p>
          <ul>
            <li>Commandes validées uniquement après paiement</li>
            <li>Confirmation par email</li>
            <li>Délai de traitement : 1-3 jours ouvrés</li>
          </ul>
        </section>

        <section>
          <h3>Livraison</h3>
          <p>Nos conditions de livraison :</p>
          <ul>
            <li>Livraison en France métropolitaine</li>
            <li>Frais de port offerts dès 100€ d'achat</li>
            <li>Délai de livraison : 5-10 jours</li>
          </ul>
        </section>

        <section>
          <h3>Retours et Remboursements</h3>
          <p>Politique de retour :</p>
          <ul>
            <li>Retour possible sous 14 jours</li>
            <li>Produit non ouvert et dans son emballage d'origine</li>
            <li>Frais de retour à la charge du client</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SalesConditionsPage;
