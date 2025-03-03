import React from 'react'
import './SearchWindow.css'
import * as motion from "motion/react-client"
import { NavLink } from "react-router-dom";



const SearchWindow = ({searchResult}) => {

    console.log(searchResult)

  return (
    <div className='search-window-container'>
      {searchResult.map(({poster_path, id, name, title, release_date, first_air_date, media_type})=>(
          <NavLink to={`/${media_type}/${id}`}>

        <motion.div className="search-card-container"
        initial={{backgroundColor:'#181818', }}
        whileHover={{backgroundColor:'#202020', }}
        key={id}
        >
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`}  alt="No Img" />
            <div className="info-search-container">
            <p>{name ? name : title}</p>
                    <span>{release_date ? 
                 new Date(release_date).getFullYear():
                 new Date(first_air_date).getFullYear()
            }</span>
            <p></p>
            </div>
        </motion.div>
        </NavLink>
      ))}
      <motion.button
       className='see-all-btn'
       initial={{backgroundColor:'#362166', }}
       whileHover={{backgroundColor:'#5a5a5a', }}
       >See All Results</motion.button>
    </div>
  )
}

export default SearchWindow
