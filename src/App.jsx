import axios from 'axios'
import { useEffect, useState } from 'react'
import Nav from './Nav/Nav';
import Carousell from './MainCarousel/MainCarousel';



function App() {

  const [movieData, setMovieData]= useState(null)
 
  const fetchData = (mediaType, mediaList)=>{

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${mediaType}/${mediaList}`,
      params: {language: 'en-US', page: '1'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTZhMTdhODM0YmZmZjI1ZmM5ZjgxMGNiYzM0MmZhNCIsIm5iZiI6MTcyODU0NTY0OC45NDIwMDAyLCJzdWIiOiI2NzA3ODM3MGQwNjE2YzdiMTlmYjQxMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NYsnaOn2mAOrxCoSq0RZAfjGk5PRZHFBn8IM9B-3D4s'
      }
    };

    axios
  .request(options)
  .then(res => setMovieData(res.data.results))
  .catch(err => console.error(err));

  }

  useEffect(()=>{
    fetchData('movie', 'popular')
  },[])

  return (
    <>
      <Nav/>
    {movieData? (
      <Carousell movieData={movieData}/>

    ): (
      <p>loading...</p>
    )}
    </>
  )
}

export default App
