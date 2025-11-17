async function runAI() {
  document.getElementById("spinner").classList.remove("hidden");
  const jugo = document.getElementById("jugo").value;
  const enfermedad = document.getElementById("enfermedad").value;

  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jugo, enfermedad })
  });

  const data = await response.json();
   document.getElementById("spinner").classList.add("hidden");


 document.getElementById("output").innerHTML =
marked.parse(data.output_text) || JSON.stringify(data, null, 2);

}
