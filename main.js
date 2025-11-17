async function runAI(mensajeUsuario) {
    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje: mensajeUsuario })
        });

        const data = await response.json();
        const respuesta = data.output_text;
        
        simularRespuestaHope(respuesta);

    } catch (err) {
        console.error("Error en runAI:", err);
        document.getElementById("respuesta").innerHTML = "Error al conectar con la IA.";
    }
}

