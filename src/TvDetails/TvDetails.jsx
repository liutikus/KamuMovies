import React, { useEffect, useState } from 'react'
import './TvDetails.css'
import axios from 'axios';
import Select from 'react-select'
import { BsBorderStyle } from 'react-icons/bs';
import { BiBorderRadius } from 'react-icons/bi';
import { Scrollbars } from 'react-custom-scrollbars-2';



const TvDetails = ({tv, images, videos, credits, id}) => {

    
    const [season, setSeason] = useState(null)
    const [seasonNumber, setSeasonNumber]= useState(1)

   const [selectOptions, setSelectOptions] =useState([{
    value: 0,
    label: '',
   }])

   

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          borderStyle: 'solid',
          boxShadow: 'none',
          backgroundColor: state.isFocused ? "#0b0d0d" : "#0b0d0d", // Change background color
          color: state.isFocused ? "#e3eaeb" : "#e3eaeb",
          borderRadius: 10,
          boxShadow: 'none',
          borderColor: '#acadae',
          ":hover": {
            borderColor: "#acadae", // Optional: Change border color on hover
          },
          
     

        }),
        menu: (provided, state) => ({
          ...provided,
          backgroundColor:'#0b0d0d',
          borderRadius: 10,

         
        }),
        option: (provided, state) => ({
          ...provided,
          borderRadius: 10,

          backgroundColor: state.isSelected ? "#181c1c" : state.isFocused ? "#242a2a" : "#0b0d0d",
          color: state.isSelected ? "#acadae" : "#e3eaeb",
          ":active": {
      backgroundColor: state.isSelected ? "#0b0d0d" : "#242a2a",
      borderStyle:'none'
    },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#acadae", 
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: '#acadae'
                
          }),
          indicatorSeparator: (provided) => ({
            display: 'none',               // Hide the vertical separator line
          }),
      };

    const fetchSeasonDetails = (num)=>{
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${id}/season/${num}`,
            params: {language: 'en-US'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NTY0OC45NDIwMDAyLCJzdWIiOiI2NzA3ODM3MGQwNjE2YzdiMTlmYjQxMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NYsnaOn2mAOrxCoSq0RZAfjGk5PRZHFBn8IM9B-3D4s'
            }
          };
          
          axios
            .request(options)
            .then(res => setSeason(res.data))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
       fetchSeasonDetails(seasonNumber)

       setSelectOptions(tv.seasons.map(({season_number})=>({
        value: season_number,
        label: `Season ${season_number}`
       })))

    },[seasonNumber])

    console.log(tv)

  return (
    <div>
      <div className="main-seasons-container" style={{textAlign:'start'}}>
        <div className="season-card">
        <Select
            options={selectOptions}
            value={selectOptions.find(option => option.value === seasonNumber)} // Ensures the correct option is selected
            onChange={(selectedOption) => setSeasonNumber(selectedOption.value)}
            styles={customStyles}
            isSearchable={false}
            className="select-season"
            />
        <input type="text" placeholder='Search Episode...' />
        </div>
        <div className="episodes-container">
            <Scrollbars
            style={{ width: '100%', height: 450 }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderThumbVertical={(props) => (
                <div
                  {...props}
                  style={{
                    backgroundColor: "#362166", 
                    borderRadius: "10px",

                  }}
                />
              )}
              renderTrackVertical={(p) => (
                <div className="trackVertical" {...p} />
              )}
            >
            
            {season && season.episodes.map(({id, name, overview, still_path, episode_number})=>(
                <div 
                key={id}
                className="episode-card">
                    <img src={`https://image.tmdb.org/t/p/original${still_path ? still_path : tv.backdrop_path }`} alt="" />
                    <div className="episode-number">{episode_number}</div>
                    <div className="info-episode">
                        <h1>{name}</h1>
                        <p>{overview}</p>
                    </div>
                </div>
            ))}
            </Scrollbars>

        </div>

      <div className="background-black"></div>
      </div>
    </div>
  )
}

export default TvDetails
