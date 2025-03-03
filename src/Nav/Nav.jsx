import React, { useEffect, useState } from 'react'
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
    const [searchInput, setSearchInput] = useState('bad')
    const [searchResult, setSearchResult] = useState(null)


    const tabs = customTabs ? customTabs : tabsName



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




  return (
    <div >
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

        {/* <div className="nav-input">
            <input 
            type="text"
            placeholder='Search...' 
            value={searchInput} 
            onChange={e=> setSearchInput(e.target.value)}
             />
            <motion.button
            whileHover={{scale: 1.2}}
            whileTap={{scale: 0.8}}
            ><CiSearch/></motion.button>
        </div>
        {searchResult && (

        <SearchWindow 
        searchResult={searchResult.slice(0,5)}
        />
        )} */}
        
        <motion.p className='search-icon'
            onClick={()=>{
                 setIsOpen(!isOpen)
                setSearchInput('')
                }}
               whileHover={{scale: 1.2}}
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
                type="text" 
                placeholder='Search...' 
                value={searchInput} 
                onChange={e=> setSearchInput(e.target.value)} />
                <motion.p
                   whileHover={{scale: 1.2}}
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
                            />
                        )
                    }
            </div>
      </div>
    </div>
  )
}

export default Nav
