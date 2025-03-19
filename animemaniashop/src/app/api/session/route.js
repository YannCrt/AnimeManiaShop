import { getServerSession } from "next-auth";
import { authOptions } from "../../auth"; // Assurez-vous d'importer les options d'auth de NextAuth

export async function GET() {
  const session = await getServerSession(authOptions); // Récupère la session
  return new Response(JSON.stringify({ session }));
}
