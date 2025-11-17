let memory = [];

export async function onRequestPost(context) {
  let body;

  // Parseamos JSON de forma segura
  try {
    body = await context.request.json();
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON in request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { mensaje, history } = body;   // history puede venir o no

  // Agregar mensaje a memoria local
  memory.push({ role: "user", content: mensaje });

  // Construcción del prompt final
  const prompt = mensaje.trim();

  // Llamada al modelo de Cloudflare AI
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${context.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.CLOUDFLARE_AI_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "Eres un doctor experto en nutrición. Responde como un asistente experimentado que procura la salud del usuario."
          },
          ...memory,
          { role: "user", content: prompt }
        ],
        max_tokens: 5000,
        skip_thinking: true,
        temperature: 0.7
      })
    }
  );

  const data = await response.json();

  // Extraemos respuesta del modelo
  let output = data?.result?.response || "";

  // Eliminar <think>
  output = output.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  return new Response(
    JSON.stringify({ output_text: output }),
    { headers: { "Content-Type": "application/json" } }
  );
}
