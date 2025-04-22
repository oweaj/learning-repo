export async function GET() {
  const isLocal = process.env.NODE_ENV === "development";

  try {
    return new Response(JSON.stringify({ message: "로그아웃 성공" }), {
      status: 200,
      headers: {
        "Set-Cookie": [
          `access=; HttpOnly; Path=/; SameSite=${isLocal ? "Lax" : "None"}; ${isLocal ? "" : "Secure;"} Max-Age=0`,
          `refresh=; HttpOnly; Path=/; SameSite=${isLocal ? "Lax" : "None"}; ${isLocal ? "" : "Secure;"} Max-Age=0`,
        ].join(", "),
      },
    });
  } catch (error) {
    console.error("로그아웃 실패:", error);
    return new Response(JSON.stringify({ message: "로그아웃 실패" }), {
      status: 500,
    });
  }
}
