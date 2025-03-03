import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import MoviePage from "./Pages/MoviePage/MoviePage.jsx";

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:mediaType/:id" element={<MoviePage />} />
    </Routes>
  );
};

export default App;
