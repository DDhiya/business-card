export async function loader() {
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Test route working",
      timestamp: new Date().toISOString(),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
