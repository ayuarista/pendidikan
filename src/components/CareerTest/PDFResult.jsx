export default function PDFResult({ result }) {
  const name = result.personalityType || "Hasil";

  return (
    <div id="pdf-content" style={{
      fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
      background: "#ffffff",
      color: "#111111",
      padding: "40px 48px",
      maxWidth: "720px",
      margin: "0 auto",
      lineHeight: 1.6,
    }}>

      {/* ── HEADER ── */}
      <div style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "24px", marginBottom: "32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3b82f6", margin: "0 0 8px" }}>
          AI Career Test · Edutech
        </p>
        <h1 style={{ fontSize: "28px", fontWeight: 900, margin: "0 0 6px", color: "#111111", letterSpacing: "-0.02em" }}>
          {result.personalityType}
        </h1>
        <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, maxWidth: "520px" }}>
          {result.personalityDescription}
        </p>
      </div>

      {/* ── KARIR ── */}
      <section style={{ marginBottom: "36px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 20px" }}>
          Peluang Karir Terbaik
        </p>

        {result.topCareers?.map((c, i) => (
          <div key={i} style={{
            display: "flex", gap: "16px", alignItems: "flex-start",
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: i < (result.topCareers.length - 1) ? "1px solid #f3f4f6" : "none",
          }}>
            {/* Match */}
            <div style={{
              minWidth: "48px", height: "48px", borderRadius: "50%",
              background: i === 0 ? "#dbeafe" : "#f3f4f6",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: i === 0 ? "#2563eb" : "#6b7280" }}>
                {c.match}%
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#111111" }}>{c.title}</span>
                {i === 0 && (
                  <span style={{
                    fontSize: "9px", fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "0.1em", padding: "2px 8px", borderRadius: "4px",
                    background: "#fef3c7", color: "#92400e",
                  }}>Top Pick</span>
                )}
              </div>

              <p style={{ fontSize: "12px", color: "#4b5563", margin: "0 0 10px", lineHeight: 1.6 }}>
                {c.description}
              </p>

              {/* Bar */}
              <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "6px", overflow: "hidden", marginBottom: "8px" }}>
                <div style={{
                  width: `${c.match}%`, height: "100%",
                  background: i === 0 ? "#3b82f6" : "#d1d5db",
                  borderRadius: "4px",
                }} />
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {c.avgSalary && (
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#059669", background: "#d1fae5", padding: "2px 10px", borderRadius: "6px" }}>
                    {c.avgSalary}
                  </span>
                )}
                {c.industryDemand && (
                  <span style={{ fontSize: "11px", color: "#6b7280", background: "#f3f4f6", padding: "2px 10px", borderRadius: "6px" }}>
                    Prospek kerja: {c.industryDemand}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── SKILL GAPS ── */}
      <section style={{ marginBottom: "36px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 8px" }}>
          Skill yang Perlu Dikembangkan
        </p>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 20px" }}>
          Berikut skill yang direkomendasikan AI untuk mendukung karir pilihanmu, beserta langkah konkret untuk memulai belajar.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {result.skillGaps?.map((s, i) => (
            <div key={i} style={{
              background: "#f9fafb",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "12px",

              breakInside: 'avoid',
              pageBreakInside: 'avoid',
              WebkitColumnBreakInside: 'avoid'
            }}>
              <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
                <h4 style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#0f172a",
                  margin: 0,
                  lineHeight: "1.25"
                }}>
                  {s.skill}
                </h4>

                <span style={{
                  flexShrink: 0,
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: s.targetLevel === "Penting" ? "#fee2e2" : "#fef3c7",
                  color: s.targetLevel === "Penting" ? "#dc2626" : "#d97706"
                }}>
                  {s.targetLevel}
                </span>
              </div>

              {/* Konten: Cara Belajar */}
              <div style={{ display: "flex", gap: "10px" }}>
                <p style={{
                  fontSize: "13px",
                  color: "#4b5563",
                  margin: 0,
                  lineHeight: "1.5",
                  textAlign: "justify",
                }}>
                  {s.howToLearn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JURUSAN + UMKM ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "36px" }}>

        {/* Jurusan */}
        <section>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 16px" }}>
            Rekomendasi Jurusan Kuliah
          </p>
          {result.recommendedMajors?.map((m, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#111111", margin: "0 0 4px" }}>{m.name}</p>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 8px", lineHeight: 1.5 }}>{m.reason}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {m.universities?.slice(0, 3).map((u, j) => (
                  <span key={j} style={{ fontSize: "10px", fontWeight: 600, color: "#2563eb", background: "#dbeafe", padding: "2px 8px", borderRadius: "4px" }}>
                    {u}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* UMKM */}
        <section>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 16px" }}>
            Ide Wirausaha & UMKM
          </p>
          {result.umkmOpportunities?.map((u, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#111111", margin: "0 0 3px" }}>{u.sector}</p>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{u.startupIdea}</p>
            </div>
          ))}
        </section>
      </div>

      {/* ── ROADMAP ── */}
      {result.skillRoadmap && (
        <section style={{
          marginBottom: "36px",
          breakInside: 'avoid',
          pageBreakInside: 'avoid',
          WebkitColumnBreakInside: 'avoid',
        }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 20px" }}>
            Rencana Pengembangan Skill (5 Tahun)
          </p>

          {/* Grid 5 Kolom */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
            {Object.entries(result.skillRoadmap).map(([, skills], i) => (
              <div key={i} style={{
                background: "#f9fafb",
                borderRadius: "10px",
                padding: "12px",
                breakInside: 'avoid'
              }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: "#ede9fe", color: "#6d28d9",
                  fontSize: "11px", fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "8px",
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#6d28d9", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Tahun {i + 1}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {(Array.isArray(skills) ? skills : []).map((sk, j) => (
                    <li key={j} style={{ fontSize: "10px", color: "#4b5563", marginBottom: "3px", paddingLeft: "10px", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: "5px", width: "4px", height: "4px", borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
                      {sk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── MOTIVASI ── */}
      {result.motivationalMessage && (
        <div style={{
          background: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          borderRadius: "0 12px 12px 0",
          padding: "16px 20px",
          marginBottom: "32px",
        }}>
          <p style={{ fontSize: "12px", color: "#1e40af", fontStyle: "italic", margin: 0, lineHeight: 1.7 }}>
            "{result.motivationalMessage}"
          </p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0 }}>
          Dibuat oleh Edutech AI Career Test · {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <p style={{ fontSize: "10px", fontWeight: 700, color: "#3b82f6", margin: 0 }}>
          Edutech
        </p>
      </div>

    </div>
  );
}