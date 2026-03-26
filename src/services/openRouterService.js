const FALLBACK_RESULT = {
  personalityType: "Creative Problem Solver",
  personalityDescription: "Kamu punya cara berpikir unik yang memadukan kreativitas dan logika untuk menyelesaikan berbagai tantangan.",
  topCareers: [
    {
      title: "UI/UX Designer",
      match: 85,
      description: "Kamu cocok banget di bidang ini karena kamu punya kepekaan visual dan kemampuan memahami kebutuhan pengguna secara intuitif.",
      avgSalary: "Rp 6–15 juta/bln",
      industryDemand: "Tinggi",
    },
    {
      title: "Digital Entrepreneur",
      match: 78,
      description: "Jiwa inovatifmu sangat cocok untuk membangun bisnis digital yang berdampak luas di era transformasi ini.",
      avgSalary: "Rp 8–25 juta/bln",
      industryDemand: "Tinggi",
    },
    {
      title: "Content Strategist",
      match: 72,
      description: "Kemampuanmu dalam mengolah ide menjadi narasi yang menarik sangat dibutuhkan di industri kreatif digital.",
      avgSalary: "Rp 5–12 juta/bln",
      industryDemand: "Sedang",
    },
  ],
  recommendedMajors: [
    {
      name: "Desain Komunikasi Visual",
      universities: ["Institut Teknologi Bandung", "Universitas Bina Nusantara"],
      reason: "Jurusan ini memadukan kreativitas dan teknologi yang sangat sesuai dengan potensimu.",
    },
    {
      name: "Ilmu Komunikasi",
      universities: ["Universitas Indonesia", "Universitas Gadjah Mada"],
      reason: "Membekali kamu dengan skill komunikasi strategis yang relevan di berbagai industri.",
    },
  ],
  skillRoadmap: {
    year1: ["Dasar desain & visual thinking", "Public speaking", "Digital literacy"],
    year2: ["Personal branding", "Project management", "Copywriting"],
    year3: ["UX research", "Data-driven decision making", "Leadership"],
    year4: ["Business strategy", "Networking profesional", "Mentor junior"],
    year5: ["Entrepreneurship", "Advanced analytics", "Global mindset"],
  },
  skillGaps: [
    {
      skill: "Komunikasi Visual",
      targetLevel: "Penting",
      howToLearn: "Ikuti kursus desain di Dicoding atau Coursera, lalu praktik bikin portofolio nyata.",
    },
    {
      skill: "Critical Thinking",
      targetLevel: "Penting",
      howToLearn: "Latih dengan membaca buku strategi, ikut debat, atau analisis studi kasus bisnis.",
    },
    {
      skill: "Digital Marketing",
      targetLevel: "Cukup",
      howToLearn: "Pelajari Google Digital Garage atau ikut bootcamp marketing online yang bersertifikat.",
    },
    {
      skill: "Data Literasi",
      targetLevel: "Cukup",
      howToLearn: "Mulai dari Google Sheets lanjut ke SQL dasar via platform belajar gratis seperti Khan Academy.",
    },
  ],
  umkmOpportunities: [
    {
      sector: "Jasa Kreatif Digital",
      description: "Layanan desain grafis, konten media sosial, dan branding untuk UMKM lokal.",
      startupIdea: "Buka studio kreatif kecil yang bantu UMKM membangun identitas digital mereka.",
    },
    {
      sector: "Edukasi & Pelatihan",
      description: "Kelas online atau workshop skill digital untuk anak muda di daerah.",
      startupIdea: "Platform micro-learning berbasis video pendek untuk skill kerja praktis.",
    },
  ],
  motivationalMessage: "Potensimu jauh lebih besar dari yang kamu bayangkan — mulai satu langkah kecil hari ini, dan konsistensi akan membawa kamu jauh.",
};

// ─── Normalizer: memastikan semua field selalu ada
function normalizeResult(raw) {
  return {
    personalityType:        raw.personalityType        || FALLBACK_RESULT.personalityType,
    personalityDescription: raw.personalityDescription || FALLBACK_RESULT.personalityDescription,
    topCareers:             Array.isArray(raw.topCareers)          && raw.topCareers.length > 0          ? raw.topCareers          : FALLBACK_RESULT.topCareers,
    recommendedMajors:      Array.isArray(raw.recommendedMajors)   && raw.recommendedMajors.length > 0   ? raw.recommendedMajors   : FALLBACK_RESULT.recommendedMajors,
    skillGaps:              Array.isArray(raw.skillGaps)           && raw.skillGaps.length > 0           ? raw.skillGaps           : FALLBACK_RESULT.skillGaps,
    umkmOpportunities:      Array.isArray(raw.umkmOpportunities)   && raw.umkmOpportunities.length > 0   ? raw.umkmOpportunities   : FALLBACK_RESULT.umkmOpportunities,
    skillRoadmap:           raw.skillRoadmap && typeof raw.skillRoadmap === "object"                      ? raw.skillRoadmap        : FALLBACK_RESULT.skillRoadmap,
    motivationalMessage:    raw.motivationalMessage    || FALLBACK_RESULT.motivationalMessage,
  };
}

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

    // ── Bug fix #1: cek HTTP error sebelum parse JSON
    if (!res.ok) {
      const errText = await res.text().catch(() => `HTTP ${res.status}`);
      console.error(`Groq HTTP ${res.status}:`, errText);
      return FALLBACK_RESULT;
    }

    const data = await res.json();

    // ── Bug fix #2: cek error field dari Groq
    if (data.error) {
      throw new Error(data.error.message);
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Tidak ada response dari AI");

    // ── Bug fix #3: parse JSON dengan fallback regex, normalize hasilnya
    let parsed;
    try {
      return JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch {
          console.error("Groq: gagal parse JSON dari regex match");
          return FALLBACK_RESULT;
        }
      } else {
        console.error("Groq: format response tidak valid");
        return FALLBACK_RESULT;
      }
    }

    // ── Bug fix #4: normalisasi agar semua field selalu ada
    return normalizeResult(parsed);

  } catch (err) {
    // ── Bug fix #5: network error / offline / race condition
    console.error("Groq fetch error:", err.message);
    return FALLBACK_RESULT;
  }
};