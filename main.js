let memory = [];
async function runAI(mensajeUsuario) {
  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje: mensajeUsuario, history: memory })
  });

  const text = await response.text();
  console.log("RAW RESPONSE FROM WORKER:", text);

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error("JSON PARSE FAILED!", e);
    return;
  }

  const respuesta = data.output_text || "Sin respuesta";
  memory.push({ role: "assistant", content: respuesta });

  simularRespuestaHope(respuesta);
}
