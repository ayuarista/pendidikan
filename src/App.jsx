import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/navigation/Header"
import Home from "./pages/Home"
import AICareerTest from "./pages/AICareerTest"
import CareerCompare from "./pages/CareerCompare"
import PagesNotFound from "./pages/PagesNotFound"

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-career-test" element={<AICareerTest />} />
        <Route path="/career-compare" element={<CareerCompare />} />
        {/* <Route path="/career/:id" element={<CareerResultPage />} /> */}
        <Route path="*" element={<PagesNotFound />} />
      </Routes>
    </Router>
  )
}