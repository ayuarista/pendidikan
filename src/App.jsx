import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"

import Header from "./components/navigation/Header"
import Home from "./pages/Home"
import AICareerTest from "./pages/AICareerTest"
import CareerCompare from "./pages/CareerCompare"
import PagesNotFound from "./pages/PagesNotFound"
import Footer from "./components/navigation/Footer"

export default function App() {
  return (
    <LanguageProvider>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-career-test" element={<AICareerTest />} />
          <Route path="/career-compare" element={<CareerCompare />} />
          {/* <Route path="/career/:id" element={<CareerResultPage />} /> */}
          <Route path="*" element={<PagesNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
      )
}