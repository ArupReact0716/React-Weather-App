import React, { useEffect, useState } from 'react'
// redux
import { useDispatch, useSelector } from "react-redux";
import { CurrentWeather, SearchWeather, setSearchValue } from '../../redux/reducer/WeatherSlice';
// reactstrap
import { Input, InputGroup } from 'reactstrap'
// icons
import { BsSearch } from 'react-icons/bs';
import { useDebounce } from '../../utils';

const Header = () => {
   const dispatch = useDispatch()
   // state
   const [currentLocation, setCurrentLocation] = useState('')
   const [searchData, setSearchData] = useState('')

   useEffect(() => {
      getCurrentLocation()
   }, [])

   const handleForm = (e) => {
      e.preventDefault()
      //   dispatch(SearchWeather(searchData))
   }

   const searchHandle = (e) => {
      e.preventDefault()
      setSearchData(e.target.value)

      //   dispatch(setSearchValue(e.target.value))
      //   if (e.target.value === '') {
      //   }
   }

   async function getCurrentLocation() {
      try {
         const response = await fetch("https://ipapi.co/json/");
         const data = await response.json();
         setCurrentLocation(data?.city)
         dispatch(CurrentWeather(data.city));
      } catch (error) {
         console.error("IP geolocation error:", error);
      }
   }

   const value = useDebounce(searchData, 500)
   console.log(value)


   return (
      <>
         <div className="mb-4">
            <h1 className='logo-text'>Weather Report 24/7</h1>
         </div>
         <div className="search-box bg-white">
            <form onSubmit={e => handleForm(e)}>
               <InputGroup className='align-items-center'>
                  <BsSearch size='20' />
                  <Input type='text' placeholder='Search by City' onChange={searchHandle} />
                  <button type='submit' className='bg-transparent'>Search</button>
               </InputGroup>
            </form>
         </div>
      </>
   )
}

export default Header