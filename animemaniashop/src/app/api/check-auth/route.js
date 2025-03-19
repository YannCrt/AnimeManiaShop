import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return Response.json({ authenticated: true, user: decoded });
  } catch (error) {
    return Response.json({ authenticated: false });
  }
}
