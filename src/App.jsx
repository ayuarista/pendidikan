import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import Header from "./components/navigation/Header"
import Footer from "./components/navigation/Footer"
import Home from "./pages/Home"
import AICareerTest from "./pages/AICareerTest"
import CareerCompare from "./pages/CareerCompare"
import PagesNotFound from "./pages/PagesNotFound"

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}