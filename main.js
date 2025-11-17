let memory = []; // session memory in browser
async function runAI(mensajeUsuario) {
  // save user message locally
  memory.push({ role: "user", content: mensajeUsuario });

  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mensaje: mensajeUsuario,
      history: memory   // send client memory to the worker
    })
  });

  const data = await response.json();

  const respuesta = data.output_text || data.error || "Sin respuesta";
  // save assistant message locally too
  memory.push({ role: "assistant", content: respuesta });

  simularRespuestaHope(respuesta);
}