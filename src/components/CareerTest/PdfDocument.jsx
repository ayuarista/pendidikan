// PdfDocument.jsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register font dengan konfigurasi yang lebih aman
Font.register({
  family: 'Montserrat',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
      fontWeight: 'bold',
    }
  ],
});

// Gunakan font standar sebagai fallback
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica', // Gunakan font standar dulu
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0f172a',
  },
  description: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 1.5,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#94a3b8',
    marginBottom: 12,
  },
  careerItem: {
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
  },
  matchBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  careerContent: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0f172a',
  },
  careerDesc: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  salaryTag: {
    fontSize: 8,
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '2px 6px',
    borderRadius: 4,
  },
  demandTag: {
    fontSize: 8,
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    padding: '2px 6px',
    borderRadius: 4,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  skillLevel: {
    fontSize: 7,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  skillDesc: {
    fontSize: 8,
    color: '#64748b',
    lineHeight: 1.3,
  },
  majorItem: {
    marginBottom: 14,
  },
  majorName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#0f172a',
  },
  majorReason: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 4,
  },
  uniTag: {
    fontSize: 8,
    backgroundColor: '#ede9fe',
    color: '#6d28d9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  umkmItem: {
    marginBottom: 10,
  },
  umkmSector: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#0f172a',
  },
  umkmIdea: {
    fontSize: 9,
    color: '#64748b',
  },
  roadmapContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  roadmapYear: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 6,
  },
  yearTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 6,
  },
  roadmapSkill: {
    fontSize: 7,
    color: '#4b5563',
    marginBottom: 2,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  message: {
    fontSize: 9,
    color: '#5b21b6',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  credit: {
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
  },
});

export const PdfDocument = ({ result }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 8, color: '#7c3aed', marginBottom: 6 }}>
          AI CAREER TEST · EDUTECH
        </Text>
        <Text style={styles.title}>{result.personalityType}</Text>
        <Text style={styles.description}>{result.personalityDescription}</Text>
      </View>

      {/* Careers */}
      <View>
        <Text style={styles.sectionTitle}>Peluang Karir Terbaik</Text>
        {result.topCareers?.map((career, idx) => (
          <View key={idx} style={styles.careerItem}>
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{career.match}%</Text>
            </View>
            <View style={styles.careerContent}>
              <Text style={styles.careerTitle}>{career.title}</Text>
              <Text style={styles.careerDesc}>{career.description}</Text>
              <View style={styles.tagContainer}>
                {career.avgSalary && (
                  <Text style={styles.salaryTag}>{career.avgSalary}</Text>
                )}
                {career.industryDemand && (
                  <Text style={styles.demandTag}>Prospek: {career.industryDemand}</Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Skills */}
      <View>
        <Text style={styles.sectionTitle}>Skill yang Perlu Dikembangkan</Text>
        <View style={styles.skillGrid}>
          {result.skillGaps?.map((skill, idx) => (
            <View key={idx} style={styles.skillCard}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.skill}</Text>
                <Text style={[
                  styles.skillLevel,
                  skill.targetLevel === 'Penting' 
                    ? { backgroundColor: '#fee2e2', color: '#b91c1c' }
                    : { backgroundColor: '#fef3c7', color: '#b45309' }
                ]}>
                  {skill.targetLevel}
                </Text>
              </View>
              <Text style={styles.skillDesc}>{skill.howToLearn}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Majors */}
      <View>
        <Text style={styles.sectionTitle}>Rekomendasi Jurusan Kuliah</Text>
        {result.recommendedMajors?.map((major, idx) => (
          <View key={idx} style={styles.majorItem}>
            <Text style={styles.majorName}>{major.name}</Text>
            <Text style={styles.majorReason}>{major.reason}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              {major.universities?.slice(0, 2).map((uni, j) => (
                <Text key={j} style={styles.uniTag}>{uni}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* UMKM */}
      <View>
        <Text style={styles.sectionTitle}>Ide Wirausaha & UMKM</Text>
        {result.umkmOpportunities?.map((item, idx) => (
          <View key={idx} style={styles.umkmItem}>
            <Text style={styles.umkmSector}>{item.sector}</Text>
            <Text style={styles.umkmIdea}>{item.startupIdea}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Roadmap */}
      <View>
        <Text style={styles.sectionTitle}>Rencana Pengembangan Skill (5 Tahun)</Text>
        <View style={styles.roadmapContainer}>
          {Object.entries(result.skillRoadmap || {}).map(([year, skills], idx) => (
            <View key={idx} style={styles.roadmapYear}>
              <Text style={styles.yearTitle}>Tahun {idx + 1}</Text>
              {(Array.isArray(skills) ? skills : []).slice(0, 3).map((skill, j) => (
                <Text key={j} style={styles.roadmapSkill}>• {skill}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {result.motivationalMessage && (
          <Text style={styles.message}>"{result.motivationalMessage}"</Text>
        )}
        <Text style={styles.credit}>
          Dibuat oleh Edutech AI Career Test · {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
        </Text>
      </View>
    </Page>
  </Document>
);