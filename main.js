let memory = [];
async function runAI(mensajeUsuario) {
        const response = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje: mensajeUsuario })
        });

        const data = await response.json();
        const respuesta = data.output_text;
        
        memory.push({ origen: "Hope IA", texto: respuesta }); //memoria

        simularRespuestaHope(respuesta);
      }
