import React, { useState } from 'react'
import './Nav.css'
import { CiSearch } from "react-icons/ci";
import {tabsName} from '../DB/data.js'
import * as motion from "motion/react-client"
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";


const Nav = ({getMediaType, customTabs}) => {

    const [selectedTab, setSelectedTab] = useState(tabsName[0])
    const [isOpen, setIsOpen] = useState(false)

    const tabs = customTabs ? customTabs : tabsName

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
        <div className="nav-input">
            <input type="text" placeholder='Search...' />
            <motion.button
            whileHover={{scale: 1.2}}
            whileTap={{scale: 0.8}}
            ><CiSearch/></motion.button>
        </div>
        
        <motion.p className='search-icon'
            onClick={()=> setIsOpen(!isOpen)}
               whileHover={{scale: 1.2}}
             whileTap={{scale: 0.8}}
            ><CiSearch/></motion.p>
        </div>
        <div 
        className="search-container">
            <div className={
                isOpen? 'input-roll-container active': 'input-roll-container'
            }>
                <input type="text" placeholder='Search...' />
                <motion.p
                   whileHover={{scale: 1.2}}
                   whileTap={{scale: 0.8}}
                onClick={()=> setIsOpen(false)}
                 className='search-icon'><IoMdClose />
                    </motion.p>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Nav
