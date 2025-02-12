import React, { useState } from 'react'
import './Nav.css'
import { CiSearch } from "react-icons/ci";
import {tabsName} from '../DB/data.js'
import * as motion from "motion/react-client"
import { IoMdClose } from "react-icons/io";




const Nav = () => {

    const [selectedTab, setSelectedTab] = useState(tabsName[0])
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="nav-container">
        <div className="nav-logo">
            <p>Kamu&<span>Movies</span></p>
        </div>
        <div className="nav-tabs">
            <ul>
                {tabsName.map((tab, index)=>(
                    <li
                    key={index}
                    onClick={()=>setSelectedTab(tab)}
                    >{tab}
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
