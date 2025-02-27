import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import MoviePage from "./Pages/MoviePage/MoviePage.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:mediaType/:id" element={< MoviePage/>} />

    </Routes>
  </BrowserRouter>
);