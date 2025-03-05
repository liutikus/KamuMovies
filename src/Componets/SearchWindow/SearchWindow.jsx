import React from 'react'
import './SearchWindow.css'
import * as motion from "motion/react-client"
import { NavLink } from "react-router-dom";
import noSearchImage from "/Images/noImages.png"



const SearchWindow = ({searchResult, clearSearch}) => {

  return (
    <div className='search-window-container'>
      {searchResult.map(({poster_path, id, name, title, release_date, first_air_date, media_type},index)=>(
        <div
        key={id}>
          <NavLink 
          to={`/${media_type}/${id}`}
          onClick={clearSearch}
          >

        <motion.div className="search-card-container"
        initial={{backgroundColor:'#181818', }}
        whileHover={{backgroundColor:'#202020', }}
       
        >
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt="No Img"
              onError={e => e.currentTarget.src = noSearchImage}
              />
            <div className="info-search-container">
            <p>{name ? name : title}</p>
            <span style={{display: 'block'}}>{
                media_type === 'tv' ? 'Tv Show' : 'Movie'
                }</span>
                    <span>{release_date ? 
                 new Date(release_date).getFullYear():
                 new Date(first_air_date).getFullYear()
                 
            }</span>
            </div>
        </motion.div>
        </NavLink>
        { index === 2 ? (

        <motion.button
         className='see-all-btn'
         initial={{backgroundColor:'#362166', }}
         whileHover={{backgroundColor:'#5a5a5a', }}
         >See All Results</motion.button>
        ): null}
      </div>
      ))}
      </div>
  )
}

export default SearchWindow
