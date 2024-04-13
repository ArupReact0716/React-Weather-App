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
         <div className="my-2">
            <div className="">
               <img src="../assets/logo-1.png" alt="" height={50} />
            </div>
         </div>
         <div className="search-box bg-white bg-opacity-50">
            <form onSubmit={e => handleForm(e)}>
               <InputGroup className='align-items-center'>
                  <BsSearch size='20' className='me-2' />
                  <Input type='text' placeholder='Search by City' className='bg-opacity-50 bg-transparent' onChange={e => setSearchCity(e.target.value)} />
                  <button type='submit' className='bg-transparent'>Search</button>
               </InputGroup>
            </form>
         </div>
      </>
   )
}

export default Header