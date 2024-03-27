import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import CheckWeather from "./pages/CheckWeather";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/check' element={<CheckWeather />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
