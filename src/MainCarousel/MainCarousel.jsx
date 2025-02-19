import React from 'react'
import Flickity from 'react-flickity-component'
import './MainCarousel.css'
import './flickity.css'
import * as motion from "motion/react-client"
import { NavLink } from 'react-router-dom'



const Carousell = ({movieData}) => {

    const flickityOptions = {
        draggable: false,
        wrapAround: true,
        // autoPlay: 2500,
        pauseAutoPlayOnHover: true,
        initialIndex: 2
    }
  return (
    <div>
      <Flickity
       className={'carousel'} // default ''
       elementType={'div'} // default 'div'
       options={flickityOptions} // takes flickity options {}
       disableImagesLoaded={false} // default false
       reloadOnUpdate // default false
       static // default false
      >
        {movieData.map(({backdrop_path, id, title, overview, poster_path, name})=>(
            
           <div
           key={id}
            className="main-card-container">
          
                <div className="card-container">
                    <div className="poster-container">
                    <NavLink to={`/movie/${id}`}>

                    <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="" />
                    </NavLink>
                    </div>
                    <div className="text-container">
                    <p className='title'>{title? title: name}</p>
                    <motion.button 
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    className='add-btn' >Watch List</motion.button>
                    <p className='overview'>{overview}</p>

                    </div>
                </div>
                <div className="background-img-container">
                <NavLink to={`/movie/${id}`}>

                    <div 
                    style={{position:'absolute', width: '100%', height:'100%', backgroundColor:'black', zIndex:1, borderRadius: 20, opacity: 0.5}}/>
                    </NavLink>
                <img className='backdrop-img' src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="" />

                </div>

           </div>

        ))}
      </Flickity>
    </div>
  )
}

export default Carousell
