async function runAI(mensajeUsuario) {

    const response = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mensaje: mensajeUsuario   // O mensajeInput.value.trim()
        })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    const respuesta = data.output_text || "No llegó output_text";

    // Enviar al chat
    document.getElementById("respuesta").innerHTML = marked.parse(respuesta);

    // Enviar a lu función de IA
    simularRespuestaHope(respuesta);
  }