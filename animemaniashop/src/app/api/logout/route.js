import { cookies } from "next/headers";

export async function POST() {
  try {
    // Supprimer le cookie token
    cookies().set("token", "", { expires: new Date(0), path: "/" });

    return new Response(JSON.stringify({ message: "Déconnexion réussie" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}
