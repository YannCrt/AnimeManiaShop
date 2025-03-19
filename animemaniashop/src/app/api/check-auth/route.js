import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = await cookies().get("token")?.value; // Ajoute 'await' ici

    if (!token) {
      return Response.json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return Response.json({ authenticated: true, user: decoded });
  } catch (error) {
    console.error(error);
    return Response.json({ authenticated: false });
  }
}
