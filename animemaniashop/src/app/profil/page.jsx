"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

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
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Voulez-vous vraiment supprimer votre compte ?")) return;

    try {
      const response = await fetch("/api/delete-account", { method: "DELETE" });
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Erreur lors de la suppression");

      alert("Compte supprimé avec succès !");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
  };

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="container mx-auto max-w-lg p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Mon Profil</h2>

      <div className="space-y-4">
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

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => router.push("/profil/edit")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Modifier le profil
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Se déconnecter
        </button>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Supprimer le profil
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
