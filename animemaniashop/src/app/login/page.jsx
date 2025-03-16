import React from "react";

function page() {
  return (
    <div className="login-page ">
      <div className="login-container">
        <h2>Connexion</h2>
        <form>
          <div className="login-input">
            <label>Email</label>
            <input type="email" placeholder="Entrez votre email" />
          </div>
          <div className="login-input">
            <label>Mot de passe</label>
            <input type="password" placeholder="Entrez votre mot de passe" />
          </div>
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
        <p className="login-footer">
          Pas encore inscrit ? <a href="/signup">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}

export default page;
