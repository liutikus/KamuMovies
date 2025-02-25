import axios from "axios";
import { use, useEffect, useState } from "react";
import Nav from "./Nav/Nav";
import Carousell from "./MainCarousel/MainCarousel";
import CarouselList from "./CarouselList/CarouselList";
import { div } from "motion/react-client";
import Loading from "./Componets/Loading";

function App() {
  const [popularMovies, setPopularMovies] = useState(null);

  const [topMovies, setTopMovies] = useState(null);

  const [nowPlaying, setNowPlaying] = useState(null);

  const [popularTv, setPopularTv] = useState(null);

  const [topTv, setTopTv] = useState(null);

  const [loading, setLoading] = useState(false)
  



  const [tab, setTab] = useState('Home')

  const getMediaType = (tab) =>{
    setTab(tab);
    setLoading(true)
  }

  const fetchData = (mediaType, mediaList, setMovie, page) => {
    
    setLoading(true)

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

  if(loading){
    setTimeout(()=>{
      setLoading(false)
    },500)
  }

  useEffect(() => {

    if (tab === "Home" || tab === "Movies") {
      fetchData("movie", "popular", setPopularMovies, 1);
      fetchData("movie", "now_playing", setNowPlaying, 1);
      fetchData("movie", "top_rated", setTopMovies, 1);
    }

    if (tab === "Home" || tab === "TvShows") {
      fetchData("tv", "popular", setPopularTv, 1);
      fetchData("tv", "top_rated", setTopTv, 1);
    }

  }, [tab]);

  console.log(topTv);
  console.log(tab)

  return (
    <>
      <Nav getMediaType={getMediaType} />

{loading ? (
  <div> <Loading/></div>
): <div>
  
  </div>}

      {tab === 'Home' && popularTv && popularMovies &&(
        <div>
        <Carousell movieData={popularMovies} />
          
          <CarouselList carouselTitle={"Popular TvShows"} movieData={popularTv} />
          <Carousell movieData={popularTv}/>

        </div>
      )}

      {tab === 'Movies' && popularMovies && nowPlaying && topMovies&& (
        <div>
        <Carousell movieData={popularMovies} />
          <CarouselList carouselTitle={"Now Playing"} movieData={nowPlaying} />
          <CarouselList carouselTitle={"Top Rated"} movieData={topMovies} />

          
        </div>
      ) }

        {tab === 'TvShows' && popularTv && topTv && (
        <div>
        <Carousell movieData={popularTv} />
          <CarouselList carouselTitle={"Popular"} movieData={popularTv} />
          <CarouselList carouselTitle={"Top Rated"} movieData={topTv} />

          
        </div>
      )}
      
    </>
  );
}

export default App;
