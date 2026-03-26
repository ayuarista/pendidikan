import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import AOS from "aos"

import Header from "./components/navigation/Header"
import Home from "./pages/Home"
import AICareerTest from "./pages/AICareerTest"
import CareerCompare from "./pages/CareerCompare"
import PagesNotFound from "./pages/PagesNotFound"
import Footer from "./components/navigation/Footer"
import ExploreCareer from "./pages/explore/ExploreCareer"
import CareerDetailPage from "./pages/explore/CareerDetailPage"
import ExploreEducation from "./pages/explore/ExploreEducation"
import EducationDetailPage from "./pages/explore/EducationDetailPage"
import ScrollToTopButton from "./components/ui/ScrollToTopButton"

function AOSInitializer() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      mirror: false,
    })
  }, [])

  useEffect(() => {
    AOS.refreshHard()
  }, [location.pathname])

  return null
}

export default function App() {

  //app
  return (
    <LanguageProvider>

      <Router>
        <AOSInitializer />
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