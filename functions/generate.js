// En memoria temporal (puede luego ser KV para persistencia por usuario)
let memory = {}; // memoria por userId

export async function onRequestPost(context) {
  let body;

  try {
    body = await context.request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON in request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { mensaje, userId } = body;
  if (!userId) return new Response(JSON.stringify({ error: "No userId provided" }), { status: 400 });

  // Inicializar memoria del usuario si no existe
  if (!memory[userId]) memory[userId] = [];

  // Agregar mensaje del usuario a memoria
  memory[userId].push({ role: "user", content: mensaje });

  // Resumir memoria si es muy larga (ej. últimos 10 mensajes)
  let recentMemory = memory[userId].slice(-10);

  // Construir prompt para la IA
  const messages = [
    {
      role: "system",
      content:
        "Eres un doctor experto en nutrición. Responde como un asistente experimentado, recuerda todo lo que el usuario te ha dicho previamente de manera concisa." + "Procura saludar una única vez"
    },
    ...recentMemory,
    { role: "user", content: mensaje }
  ];

  // Llamada al modelo de Cloudflare AI
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${context.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.CLOUDFLARE_AI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        max_tokens: 5000,
        skip_thinking: true,
        temperature: 0.7,
      }),
    }
  );

  const data = await response.json();
  let output = data?.result?.response || "";
  output = output.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // Guardar respuesta de la IA en memoria
  memory[userId].push({ role: "assistant", content: output });

  return new Response(JSON.stringify({ output_text: output }), {
    headers: { "Content-Type": "application/json" },
  });
}
