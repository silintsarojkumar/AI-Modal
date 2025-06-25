import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const out = document.getElementById("output");

const submit = document.getElementById("submit");
let input = document.getElementById("input");

// Initialize Gemini API
const ai = new GoogleGenerativeAI("AIzaSyAigG-0JgWQ-ukWCgHgmN5ZSJullZLQ5Pg");

async function main() {
  const question = input.value.trim();
  if (!question) return;

  // Show user's question
  out.innerHTML += `<p><strong> You:</strong> ${question}</p>`;

  // Clear input field
  input.value = "Thinking...";

  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = await response.text();

    out.innerHTML += `<p><strong>AI :</strong> ${text}</p>`;
  } catch (err) {
    console.error(err);
    out.innerHTML += `<p style="color:red;">❌ Error getting response</p>`;
  }

  // Clear input for next question
  input.value = "";
}

submit.addEventListener("click", () => {
  main();
});
