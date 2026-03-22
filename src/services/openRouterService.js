export const analyzeCareerWithAI = async (userPrompt) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("API Key Groq tidak ditemukan!");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a professional career advisor. Always return JSON."
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Tidak ada response dari AI");

    try {
      return JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      throw new Error("Format AI tidak valid");
    }

  } catch (err) {
    console.error("Groq Error:", err.message);

    return {
      careers: [
        { name: "UI/UX Designer", match: "85%" },
        { name: "Frontend Developer", match: "78%" },
        { name: "Digital Entrepreneur", match: "72%" }
      ],
      personality: "Creative and analytical thinker",
      roadmap: "Start learning design basics, build portfolio, join freelance projects",
      message: "You have strong potential. Stay consistent and keep learning!"
    };
  }
};