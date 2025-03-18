"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexte/auth"; // Utilisation du context

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { logout } = useAuth(); // Récupère la fonction de déconnexion du contexte

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profil");
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Erreur de chargement");

        setUser(data.user);
      } catch (error) {
        console.error("Erreur:", error);
        router.push("/login"); // Redirige si non connecté
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await logout(); // Déconnexion via le contexte
    router.push("/"); // Redirige vers la page d'accueil
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="profile-container">
      <h2>Mon Profil</h2>

      <div className="profile-details">
        <p>
          <strong>Prénom :</strong> {user.firstname}
        </p>
        <p>
          <strong>Nom :</strong> {user.lastname}
        </p>
        <p>
          <strong>Email :</strong> {user.email}
        </p>
        <p>
          <strong>Adresse :</strong> {user.adress}
        </p>
      </div>

      <div className="profile-actions">
        <button
          onClick={() => router.push("/profil/edit")}
          className="action-button edit-button"
        >
          Modifier le profil
        </button>
        <button onClick={handleLogout} className="action-button logout-button">
          Se déconnecter
        </button>
        <button className="action-button delete-button">
          <a href="/profil/delete">Supprimer le profil</a>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
