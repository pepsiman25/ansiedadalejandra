async function runAI(mensajeUsuario) {
    const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje : mensajeInput })
  });

 document.getElementById("respuesta").innerHTML =
marked.parse(data.output_text) || JSON.stringify(data, null, 2);

const data = await response.json();
const respuesta = data.output_text; 
simularRespuestaHope(respuesta)

}
