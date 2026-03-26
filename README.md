# Edutech 

A web application designed to help students discover their ideal career paths based on personality analysis powered by AI.

## ✨ Features

-   **Personality Assessment**: Interactive quiz to map user personality traits.
-   **AI-Powered Analysis**: Utilizes Groq (Llama 3) for fast and deep career matching.
-   **Comprehensive Results**: Detailed breakdown of career recommendations, skill gaps, and university majors.
-   **PDF Export**: Downloadable detailed report generated.
-   **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## 🛠 Tech Stack

-   **Frontend**: React.js, Vite
-   **Styling**: Tailwind CSS
-   **AI Engine**: Groq API (llama-3.1-8b-instant)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   Groq API Key

### Installation

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```

## 🤖 AI Integration (Groq)

This application uses the **Groq API** to generate career recommendations.

1.  **Prompt Engineering**: User answers are compiled into a structured prompt asking for career matches, skill analysis, and study recommendations in JSON format.
2.  **API Call**: The frontend sends a request to the Groq API endpoint (chat/completions) using the `Llama-3.1-70b-versatile` model for low-latency responses.
3.  **Response Parsing**: The raw text response from the AI is parsed into a JSON object to populate the `ResultPage` dynamically.

Made with ❤️ by Jujur bingung Team