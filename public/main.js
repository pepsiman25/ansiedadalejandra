async function runAI() {
  const goal = document.getElementById("goal").value;
  const contextParam = document.getElementById("contextParam").value;

  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal, contextParam })
  });

  const data = await response.json();

  document.getElementById("output").textContent =
    data.output_text || JSON.stringify(data, null, 2);
}
