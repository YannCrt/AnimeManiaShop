import React from "react";

function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Connexion
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Entrez votre email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Se connecter
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Pas encore inscrit ?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}

export default page;
