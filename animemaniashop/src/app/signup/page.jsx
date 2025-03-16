import React from "react";

function page() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Inscription</h2>
        <form>
          <div className="login-input">
            <label className="block text-gray-700">Prénom</label>
            <input type="text" placeholder="Votre prénom" />
          </div>
          <div className="login-input">
            <label>Nom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Votre nom"
            />
          </div>
          <div className="login-input">
            <label>Email</label>
            <input type="email" placeholder="Votre email" />
          </div>
          <div className="login-input">
            <label>Mot de passe</label>
            <input type="password" placeholder="Votre mot de passe" />
          </div>
          <button className="login-button">S'inscrire</button>
        </form>
        <p className="login-footer">
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
}

export default page;
