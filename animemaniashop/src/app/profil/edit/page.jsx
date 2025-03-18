"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexte/auth"; 
import '../../css/edit.css'; 

const EditProfilePage = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    adress: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const router = useRouter();
  const { logout } = useAuth(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profil");
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Erreur de chargement");

        setUser(data.user);
      } catch (error) {
        console.error("Erreur:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); 
    setSuccessMessage(''); 

    console.log("Données envoyées à l'API:", user);

    try {
      const response = await fetch("/api/profil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("Réponse du serveur:", data); // Débogage

      if (!response.ok) throw new Error(data.message || "Erreur lors de la mise à jour");

      setSuccessMessage("Profil mis à jour !");
      router.push("/profil"); 
    } catch (error) {
      console.error("Erreur:", error);
      setErrorMessage("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Modifier Mon Profil</h2>

      {/* Affichage du message d'erreur ou de succès */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSave} className="edit-form">
        <div className="form-group">
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adress">Adresse</label>
          <input
            type="text"
            id="adress"
            name="adress"
            value={user.adress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="action-button save-button" disabled={loading}>
            {loading ? "Enregistrement..." : "Sauvegarder les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
