import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../../Nav/Nav";
import "./MoviePage.css";
import { FaStar } from "react-icons/fa";
import MovieDetails from "../../MovieDetails/MovieDetails";
import noImage from '/Images/no-profile-picture.png'
import noPosterImage from '/Images/noImages.png'
import noBackdropImage from '/Images/desktop-wallpaper-film-strip-background.jpg'
import TvDetails from "../../TvDetails/TvDetails";
import CarouselList from "../../CarouselList/CarouselList";
import Loading from "../../Componets/Loading";


const MoviePage = () => {
  const { id } = useParams();
  const {mediaType} = useParams()


  
  const [loading, setLoading]= useState(false)
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null)
  const[recom, setRecom]= useState(null)

  const fetchMovieDetails = (setData, credits) => {

    setLoading(true)

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}${credits}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NTY0OC45NDIwMDAyLCJzdWIiOiI2NzA3ODM3MGQwNjE2YzdiMTlmYjQxMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NYsnaOn2mAOrxCoSq0RZAfjGk5PRZHFBn8IM9B-3D4s",
      },
    };

    axios
      .request(options)
      .then((res) => setData(res.data))
      // .then(()=> setLoading(false))
      .catch((err) => console.error(err));
  };

  if(loading){
    setTimeout(()=>{
      setLoading(false)
    },1000)
  }

  const handleLoading = (param)=>{
    setLoading(param)
  }

  useEffect(() => {
    fetchMovieDetails(setMovie, "");
    fetchMovieDetails(setCredits, "/credits");
    fetchMovieDetails(setImg, "/images");
    fetchMovieDetails(setVideo, "/videos")
    fetchMovieDetails(setRecom, "/recommendations")
  }, [id]);


  return (
    <div>
      <Nav customTabs={[""]} />
      {loading ? (
  <div> <Loading/></div>
): <div>
  
  </div>}
      {movie && credits && video && recom && (
        <div className="main-movie-page-container">
          <div className="background-container">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="no backdrops images"
              onError={e=> e.currentTarget.src = noBackdropImage}
              className="background-img"
            />
            
            <div className="bakcground-black" />
            <div className="main-details-container">
                <div className="general-info-container">

              <div className="poster-details-container">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt="no img"
                  onError={e=> e.currentTarget.src = noPosterImage}
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
                <h1>{movie.title}</h1>
                <div className="review-container">
                   <span><FaStar/></span> <p>{movie.vote_average.toFixed(1)} / 10 <span>({movie.vote_count})</span></p>
                </div>
                <div className="overview-details-container">
                  <h1 style={{display: 'inline'}}>{
                 credits.crew.filter(({job})=>job === 'Director').length
                   === 1 ? 'Director:' : 'Directors:'
                  }</h1>
                    {credits.crew.filter(({job})=>job === 'Director')
                        .map(({name, id, index})=>(
                        <div style={{margin: ' 5px 0 0 0' }} key={id}> {name}
                      
                        </div>
                          
                        ))}
                    <p>{movie.overview}</p>
                </div>
                    <h1>Top Cast:</h1>
                <div className="credits-container">
                    {credits.cast.slice(0,5).
                    map(({profile_path, name, character, id})=>(
                        <div key={id} className="credits-card">
                            <img 
                            src={profile_path ? `https://image.tmdb.org/t/p/original${profile_path}` : noImage} 
                            alt="NoImg"
                            onError={(e) => e.currentTarget.src = noImage}
                            />
                            <div>
                            <p>{name}</p>
                            <span>{character}</span>
                            </div>
                        </div>
                    ))}
            </div>
              </div>
                </div>
                {
                    mediaType === 'movie' ? (
                    <MovieDetails
                     movie={movie}
                    credits={credits}
                    videos={video.results}
                    images={img}
                    />
                    ) : (
                        <TvDetails
                        tv={movie}
                        credits={credits}
                        videos={video.results}
                        images={img}
                        id={id}
                        />
                    )
                }
            {recom.total_results ? (
            
                 <div className="recom-movies-container">
          <CarouselList carouselTitle={"You may like"} movieData={recom.results} mediaType={mediaType}
          handleLoading={handleLoading}
          />
          <div className="background-black" >

          </div>

      </div>
            ): null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
