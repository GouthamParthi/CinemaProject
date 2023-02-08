import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Video from "./components/Video";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/video/:movieId" element={<Video />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
