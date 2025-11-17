async function runAI() {
  const mensajeInput = document.getElementById("mensajeInput").value;

  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensajeInput })
  });

 document.getElementById("respuesta").innerHTML =
marked.parse(data.output_text) || JSON.stringify(data, null, 2);

}
