let memory = [];
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);

async function runAI(mensajeUsuario) {
  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje: mensajeUsuario, userId })
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error("JSON PARSE FAILED!", e);
    return;
  }

  const respuesta = data.output_text || "Sin respuesta";

  // Add to memory
  memory.push({ role: "user", content: mensajeUsuario });
  memory.push({ role: "assistant", content: respuesta });

  simularRespuestaHope(respuesta);
}