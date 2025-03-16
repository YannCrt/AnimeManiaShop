import React from "react";

function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Inscription</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Prénom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Votre prénom"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Votre nom"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Votre email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Votre mot de passe"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            S'inscrire
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-500">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}

export default page;
