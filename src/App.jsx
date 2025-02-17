import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./Nav/Nav";
import Carousell from "./MainCarousel/MainCarousel";
import CarouselList from "./CarouselList/CarouselList";
import { div } from "motion/react-client";

function App() {
  const [popularMovies, setPopularMovies] = useState(null);

  const [topMovies, setTopMovies] = useState(null);

  const [nowPlaying, setNowPlaying] = useState(null);

  const [popularTv, setPopularTv] = useState(null);

  const [topTv, setTopTv] = useState(null);

  const [tab, setTab] = useState('')

  const testFunc = (tab) =>{
    setTab(tab)
  }

  const fetchData = (mediaType, mediaList, setMovie, page) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${mediaList}`,
      params: { language: "en-US", page: page },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NTY0OC45NDIwMDAyLCJzdWIiOiI2NzA3ODM3MGQwNjE2YzdiMTlmYjQxMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NYsnaOn2mAOrxCoSq0RZAfjGk5PRZHFBn8IM9B-3D4s",
      },
    };

    axios
      .request(options)
      .then((res) => setMovie(res.data.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData("movie", "popular", setPopularMovies, '1');
    fetchData("movie", "top_rated", setTopMovies, '1');
    fetchData("movie", "now_playing", setNowPlaying, '1');
    fetchData("tv", "popular", setPopularTv, '1');
    fetchData("tv", "top_rated", setTopTv, '1' );
  }, []);

  console.log(topTv);
  console.log(tab)

  return (
    <>
      <Nav testFunc={testFunc} />
      {popularMovies ? (
        <Carousell movieData={popularMovies} />
      ) : (
        <p>loading...</p>
      )}

      {nowPlaying ? (
        <CarouselList
          carouselTitle={"Now Playing Movies"}
          movieData={nowPlaying}
        />
      ) : (
        <p>loading...</p>
      )}
      {popularTv ? (
        <CarouselList carouselTitle={"Popular TvShows"} movieData={popularTv} />
      ) : (
        <p>loading...</p>
      )}
      
    </>
  );
}

export default App;
