import React, { useEffect, useState } from 'react'
import './MovieDetails.css'
import YouTube from 'react-youtube'
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const MovieDetails = ({movie, videos, credits, images, recom}) => {

const trailer = videos.find(({type})=> type === 'Trailer')

const[backdropsImages, setBackdropsImages]= useState([])

useEffect(() => {
  if (!images?.backdrops?.length) return; // Ensures images.posters exists and isn't empty

  setBackdropsImages(
    images.backdrops.slice(1, 4).map(({ file_path, height, width }) => ({
      src: `https://image.tmdb.org/t/p/original${file_path}`,
      width,
      height,
    }))
  );
}, [images]); 

  console.log(videos)

  return (
    <div className='main-movie-details-container'>
      <div className="media-movie-details-container">

      <div className="images-container">
        <h1>Images:</h1>
      <RowsPhotoAlbum photos={backdropsImages}
      targetRowHeight={200}
      rowConstraints={{ singleRowMaxHeight: 150 }}
      />
        <div className="background-black"></div>
        

      </div>
      <div className="videos-container">
        <h1>Official Trailer:</h1>
        <YouTube
        videoId={trailer.key}
        iframeClassName='trailer-video'
        />
        <div className="background-black"></div>
      </div>
      </div>
     
    </div>
  )
}

export default MovieDetails
