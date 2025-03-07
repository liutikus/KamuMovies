import React, { useEffect, useRef, useState } from 'react'
import './Nav.css'
import { CiSearch } from "react-icons/ci";
import {tabsName} from '../DB/data.js'
import * as motion from "motion/react-client"
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import SearchWindow from '../Componets/SearchWindow/SearchWindow.jsx';
import axios from 'axios';
import { AnimatePresence } from "motion/react"



const Nav = ({getMediaType, customTabs}) => {

    const [selectedTab, setSelectedTab] = useState(tabsName[0])
    const [isOpen, setIsOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(null)

    const searchInputRef = useRef(null)


    const tabs = customTabs ? customTabs : tabsName

    const handleSearchFocus = () =>{
        searchInputRef.current.focus()
    }

    const fetchSearchData = (searchInput)=>{

        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/multi',
          params: {query: searchInput, include_adult: 'false', language: 'en-US', page: '1'},
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NTY0OC45NDIwMDAyLCJzdWIiOiI2NzA3ODM3MGQwNjE2YzdiMTlmYjQxMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NYsnaOn2mAOrxCoSq0RZAfjGk5PRZHFBn8IM9B-3D4s'
          }
        };
        
        axios
          .request(options)
          .then(res => {setSearchResult(
            res.data.results.filter(({media_type})=>media_type === 'movie' || media_type === 'tv')
            .sort((a, b) => b.popularity - a.popularity)
        )
          
    })
          .catch(err => console.error(err));
    }

    useEffect(()=>{
        fetchSearchData(searchInput)
       
    }, [searchInput])

const clearSearch = ()=> {
    setIsOpen(false)
    setSearchInput('')

}


  return (
    <div className='main-nav-container' >
      <div className="nav-container">
        <div className="upper-nav">

        <div className="nav-logo">
        <NavLink to="/" end>
            <p>Kamu&<span>Movies</span></p>
            </NavLink>
        </div>
        <div className="nav-tabs">
            <ul>
                {tabs.map((tab, index)=>(
                    <li
                    key={index}
                    onClick={()=>{
                        setSelectedTab(tab)
                        getMediaType(tab)
                    }}>
                    
                        {tab}
                        {tab === selectedTab ? (
                            <motion.div 
                            layoutId='underline'
                            className='underline'/>

                        ): null}


                    </li>

                    
                ))}
            </ul>
        </div>

        
        <motion.p className='search-icon'
            onClick={()=>{
                 setIsOpen(!isOpen)
                setSearchInput('')
                handleSearchFocus()
                }}
               whileHover={{scale: 0.9}}
             whileTap={{scale: 0.8}}
            ><CiSearch/></motion.p>
        </div>

        </div>
        <div 
        className="search-container">
            <div className={
                isOpen? 'input-roll-container active': 'input-roll-container'
            }>
                <input
                style={{visibility : isOpen ? 'visible' : 'hidden'}}
                ref={searchInputRef} 
                type="text" 
                placeholder='Search...' 
                value={searchInput} 
                onChange={e=> setSearchInput(e.target.value)} />
                <motion.p
                   whileHover={{scale: 0.9}}
                   whileTap={{scale: 0.8}}
                onClick={()=> {setIsOpen(false)
                setSearchInput('')

                }}
                 className='close-icon'><IoMdClose />
                    </motion.p>
                    {
                        isOpen && searchResult &&(
                            
                            <SearchWindow 
                            searchResult={searchResult.slice(0,3)}
                            clearSearch={clearSearch}
                            />
                        )
                    }
            </div>
      </div>
    </div>
  )
}

export default Nav
