export async function postLongUrl(longUrl: string) {
  const url = `http://localhost:3000/api/shorten`;

  const data = longUrl;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({url: longUrl}),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Error sending data: ${error}`);
  }
}


