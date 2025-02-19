import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../../Nav/Nav";
import "./MoviePage.css";
import { FaStar } from "react-icons/fa";
import MovieDetail from "../../MovieDetails/MovieDetails";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [img, setImg] = useState(null);

  const fetchMovieDetails = (setData, credits) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}${credits}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NTY0OC45NDIwMDAyLCJzdWIiOiI2NzA3ODM3MGQwNjE2YzdiMTlmYjQxMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NYsnaOn2mAOrxCoSq0RZAfjGk5PRZHFBn8IM9B-3D4s",
      },
    };

    axios
      .request(options)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovieDetails(setMovie, "");
    fetchMovieDetails(setCredits, "/credits");
    fetchMovieDetails(setImg, "/images");
  }, [id]);

  console.log(movie, credits);
  console.log(img);
  return (
    <div>
      <Nav customTabs={[""]} />

      {movie && credits && (
        <div>
          <div className="background-container">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              className="background-img"
            />
            <div className="bakcground-black" />
            <div className="main-details-container">
              <div className="poster-details-container">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt=""
                />
              </div>
              <div className="info-container">
                <div className="movie-details-title">
                  {img &&
                    (() => {
                      const logo = img.logos.find(
                        ({ iso_639_1 }) => iso_639_1 === "en"
                      );
                      return logo ? (
                        <div>
                          <img
                            src={`https://image.tmdb.org/t/p/original${logo.file_path}`}
                            alt="Movie Logo"
                          />
                        </div>
                      ) : null;
                    })()}
                </div>
                <div className="genres-container">
                    {movie.genres.map(({id,name})=>(
                        <button key={id}>{name}</button>
                    
                    ))}
                </div>
                <div className="review-container">
                   <span><FaStar/></span> <p>{movie.vote_average.toFixed(1)} / 10 <span>({movie.vote_count})</span></p>
                </div>
                <div className="overview-details-container">
                    <p>{movie.overview}</p>
                </div>
                <div className="credits-container">
                    {credits.cast.slice(0,5).
                    map(({profile_path, name, character, id})=>(
                        <div key={id} className="credits-card">
                            <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt="" />
                            <p>{name}</p>
                            <span>({character})</span>
                        </div>
                    ))}
            </div>
              </div>
           
            </div>
          </div>
          <div>
            <MovieDetail/>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
