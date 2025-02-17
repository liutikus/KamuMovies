import React from 'react'
import './CarouselList.css'
import Flickity from 'react-flickity-component'
import { CiStar,CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";


const CarouselList = ({movieData, carouselTitle}) => {

    const flickityOptions = {
        initialIndex: 0,
        freeScroll: true,
        contain: true,
        prevNextButtons: false,
        pageDots: false
    }

  return (
    <div className='main-carousel-container'>
      <p className="carousel-title">
            {carouselTitle}
      </p>
      <div className="carousel-container">
        <Flickity
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static>
        {movieData.map(({poster_path, title, id, release_date, vote_average, first_air_date})=>(
            
        <div
        key={id}
        className='carousel-card-container'>
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" />
            <p className="movie-title">
                {title}
            </p>
            <div className="movie-info">
                <p>{release_date ? 
                 new Date(release_date).getFullYear():
                 new Date(first_air_date).getFullYear()
            }</p>
                <div className='movie-info-btns'>
                    <button><CiHeart/></button>
                    <button><IoEyeOutline /></button>
                    <button><CiStar className='star'/></button>
                    <p className='raiting-text'>{vote_average.toFixed(1)}/10</p>
                </div>
            </div>
        </div>
        ))}

        </Flickity>
      </div>
    </div>
  )
}

export default CarouselList
