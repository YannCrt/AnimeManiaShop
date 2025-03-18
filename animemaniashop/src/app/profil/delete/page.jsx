'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "../../css/delete.css"

const SupprimerPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(true);
  const router = useRouter();

  // Fonction pour annuler la suppression et revenir à la page précédente
  const annulerSuppression = () => {
    setShowConfirmation(false); // Ferme la boîte de confirmation
    router.push('/profil'); // Redirige vers la page de profil
  };

  
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/delete-account", { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur lors de la suppression");

      alert("Compte supprimé avec succès !");
      router.push("/"); 
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="confirmation-container">
      {showConfirmation && (
        <div className="confirmation-box">
          <h2>Êtes-vous sûr de vouloir supprimer votre compte ?</h2>
          <div className="confirmation-actions">
            <button
              className="action-button yes-button"
              onClick={handleDeleteAccount}
            >
              Oui
            </button>
            <button
              className="action-button no-button"
              onClick={annulerSuppression}
            >
              Non
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupprimerPage;
