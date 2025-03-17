"use client";

import React, { useState } from "react";

function Inscription() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    adress: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Inscription réussie !");
        window.location.href = "/";
      } else {
        alert(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-input">
            <label>Prénom</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
            />
          </div>
          <div className="login-input">
            <label>Nom</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="login-input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
            />
          </div>
          <div className="login-input">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <div className="login-input">
            <label>Adresse</label>
            <input
              type="text"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              placeholder="Votre adresse"
              required
            />
          </div>
          <button type="submit" className="login-button">
            S'inscrire
          </button>
        </form>
        <p className="login-footer">
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
}

export default Inscription;
