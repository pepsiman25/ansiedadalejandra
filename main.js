async function runAI(mensajeUsuario) {
    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje: mensajeUsuario })
        });

        const data = await response.json();

        document.getElementById("respuesta").innerHTML =
            data.output_text || "Sin respuesta";
        
        simularRespuestaHope(data.output_text);

    } catch (err) {
        console.error("Error en runAI:", err);
        document.getElementById("respuesta").innerHTML = "Error al conectar con la IA.";
    }
}

