import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"

import Header from "./components/navigation/Header"
import Home from "./pages/Home"
import AICareerTest from "./pages/AICareerTest"
import CareerCompare from "./pages/CareerCompare"
import PagesNotFound from "./pages/PagesNotFound"
import Footer from "./components/navigation/Footer"
import ExploreCareer from "./pages/ExploreCareer"
import CareerDetailPage from "./pages/CareerDetailPage"
import ExploreEducation from "./pages/ExploreEducation"
import EducationDetailPage from "./pages/EducationDetailPage"
import ScrollToTopButton from "./components/ui/ScrollToTopButton"

export default function App() {
  return (
    <LanguageProvider>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-career-test" element={<AICareerTest />} />
          <Route path="/career-compare" element={<CareerCompare />} />
          <Route path="/explore-career" element={<ExploreCareer />} />
          <Route path="/explore-education" element={<ExploreEducation />} />
          <Route path="/education/:slug" element={<EducationDetailPage />} />
          <Route path="/career/:slug" element={<CareerDetailPage />} />

          <Route path="*" element={<PagesNotFound />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </Router>
    </LanguageProvider>
  )
}