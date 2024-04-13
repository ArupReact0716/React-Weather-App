import React, { useEffect, useLayoutEffect, useState } from 'react'
// redux
import { useDispatch } from "react-redux";
import { CurrentWeather } from '../../redux/reducer/WeatherSlice';
// reactstrap
import { Input, InputGroup } from 'reactstrap'
// icons
import { BsSearch } from 'react-icons/bs';
import { useDebounce } from '../../utils';

const Header = () => {
   const dispatch = useDispatch()
   // state
   const [currentLocation, setCurrentLocation] = useState('')
   const [searchCity, setSearchCity] = useState('')
   const searchValue = useDebounce(searchCity, 1000)

   useLayoutEffect(() => {
      getCurrentLocation()
   }, [])

   useEffect(() => {
      if (searchValue !== '') {
         dispatch(CurrentWeather(searchValue));
      } else if (currentLocation !== '') {
         dispatch(CurrentWeather(currentLocation));
      } else {
         console.log('Not get current Location')
      }
   }, [searchValue])

   const handleForm = (e) => {
      e.preventDefault()
      dispatch(CurrentWeather(searchCity));
   }

   async function getCurrentLocation() {
      try {
         const response = await fetch("https://ipapi.co/json/");
         const data = await response.json();
         setCurrentLocation(data?.city)
         dispatch(CurrentWeather(data.city));
      } catch (error) {
         console.error("IP geolocation error:", error);
         console.log('Not get current Location')
      }
   }

   return (
      <>
         <div className="mb-4">
            <h1 className='logo-text'>Weather Report 24/7</h1>
         </div>
         <div className="search-box bg-white">
            <form onSubmit={e => handleForm(e)}>
               <InputGroup className='align-items-center'>
                  <BsSearch size='20' />
                  <Input type='text' placeholder='Search by City' onChange={e => setSearchCity(e.target.value)} />
                  <button type='submit' className='bg-transparent'>Search</button>
               </InputGroup>
            </form>
         </div>
      </>
   )
}

export default Header