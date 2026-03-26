# Edutech 

Aplikasi web yang dirancang untuk membantu siswa menemukan jalur karir ideal mereka berdasarkan analisis kepribadian yang didukung oleh AI.

## ✨ Fitur

-   **Asesmen Kepribadian**: Kuis interaktif untuk memetakan sifat kepribadian pengguna.
-   **Analisis Berbasis AI**: Menggunakan Groq (Llama 3) untuk pencocokan karir yang cepat dan mendalam.
-   **Hasil Lengkap**: Rincian rekomendasi karir, Skill yang perlu diasah, contoh Bisnis UMKM yang bisa di buat, dan jurusan universitas.
-   **Hasil analisis**: Laporan analisis yang dapat diunduh.
-   **Desain Responsif**: Tampilan yang sepenuhnya responsif dibangun dengan Tailwind CSS.

## 🛠 Teknologi yang Digunakan

-   **Frontend**: React.js, Vite
-   **Styling**: Tailwind CSS
-   **Bantuan analisis dari AI**: Groq API (llama-3.1-8b-instant)

## 🚀 Start

### Prasyarat

-   Node.js (v18 atau lebih tinggi)
-   npm atau yarn

### Instalasi

1.  Instal dependensi:
    ```bash
    npm install
    ```
2.  Jalankan server pengembangan:
    ```bash
    npm run dev
    ```

## 🤖 Integrasi AI (Groq)

Aplikasi ini menggunakan **Groq API** untuk menghasilkan rekomendasi karir.

1.  **Prompt untuk menganalisa**: Jawaban pengguna dikompilasi menjadi prompt terstruktur yang meminta rekomendasi karir, analisis keterampilan, dan saran studi dalam format JSON.
2.  **Groq API**: Frontend mengirimkan permintaan ke endpoint Groq API (chat/completions) menggunakan model `Llama-3.1-70b-versatile` untuk respons dengan latensi rendah.
3.  **Parsing Respons**: Respons teks mentah dari AI diurai menjadi objek JSON untuk mengisi `ResultPage` secara dinamis.

Dibuat dengan ❤️ oleh Jujur Bingung team!