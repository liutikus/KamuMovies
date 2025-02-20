import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import './MovieDetails.css'
import errorImg from '/Images/no-profile-picture.png'
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";


const MovieDetails = ({movie, credits, video, images}) => {

  const trailer = video.find(({type})=>type === 'Trailer')
  const [backdropsImages, setBackdropsImages] = useState([{
    src: '',
    width: 0,
    height: 0,
    srcSet: [
      { src: "", width: 0, height: 0 },
      { src: "", width: 0, height: 0 },
    ],
  }])
  useEffect(()=>{
    if (!images?.posters?.length) return;

    setBackdropsImages(
      images.backdrops.slice(0, 10).map(({ file_path, height, width }) => ({
        src: `https://image.tmdb.org/t/p/original${file_path}`,
        width: width/10,
        height: height/10,
      }))
    );
  },[images])

console.log(backdropsImages)
  return (
    <div>

    <div className='movie-details-container'>
      <div className="actors-container">
        <h1>Top Cast</h1>
        {credits.cast.slice(0, 10).map(({name, character, profile_path, id})=>(
          <div key={id} className='actors-card'>
            <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt="-NO PHOTO-"  onError={e=> e.target.src = errorImg}/>
            <div>
            <p>{name}</p>
            <p className='character-name'>{character}</p>

            </div>
            <div className="bakcground-actors-black"/>
          </div>
        ))}
      </div>
      <div className="trailer-container">
        <div>
        <div>
        <p>Official Trailer</p>
      <YouTube iframeClassName='trailer-video' videoId={trailer.key} />
        </div>
      <div className="bakcground-actors-black"/>
        </div>
        <div className="photos-album-conatiner">
          <MasonryPhotoAlbum photos={backdropsImages}/>
        </div>
      </div>
    </div>
      {backdropsImages.map(({src})=>(
        <img src={src}/>
      ))}
    </div>
  )
}

export default MovieDetails
