import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    console.log("Token found:", !!token); // Debug log: confirms if token exists

    if (!token) {
      console.log("No token present");
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Token decoded successfully:", decoded);

      return new Response(
        JSON.stringify({
          authenticated: true,
          user: {
            id: decoded.id,
            email: decoded.email,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (verificationError) {
      console.error("Token verification failed:", verificationError.message);
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Unexpected error in check-auth:", error);
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
