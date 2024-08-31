export async function POST(request: any) {
  try {
    const { url } = await request.json();

    const response = await fetch("http://localhost:5000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to download video");
    }

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "video.mp4";
    link.click();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
