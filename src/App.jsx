import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/navigation/Header"
import Footer from "./components/navigation/Footer"
import Home from "./pages/Home"

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}