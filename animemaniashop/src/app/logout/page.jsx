"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/logout", { method: "POST" });
        router.push("/");
        router.refresh(); // Rafraîchir la page après déconnexion
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    };

    logout();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Déconnexion en cours...</h2>
        <p className="text-gray-600">
          Merci de votre visite ! Vous allez être redirigé.
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
