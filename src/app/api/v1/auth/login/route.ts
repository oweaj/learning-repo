import serverAxios from "@/api/serverAxios";
import axios from "axios";

export async function POST(req: Request) {
  const isLocal = process.env.NODE_ENV === "development";
  const body = await req.json();

  try {
    const response = await serverAxios.post("/api/v1/auth/login", body);

    const { access, refresh } = response.data;

    return new Response(JSON.stringify({ message: "로그인 성공" }), {
      status: 200,
      headers: {
        "Set-Cookie": [
          `access=${access}; HttpOnly; Path=/; SameSite=${isLocal ? "Lax" : "None"} ${isLocal ? "" : "Secure;"}`,
          `refresh=${refresh}; HttpOnly; Path=/; SameSite=${isLocal ? "Lax" : "None"} ${isLocal ? "" : "Secure;"}`,
        ].join(", "),
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("로그인 실패:", error.response?.data || error.message);
      return new Response(JSON.stringify({ message: "로그인 실패" }), {
        status: 401,
      });
    }
  }
}
