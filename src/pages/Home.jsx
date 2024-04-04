import React, { useEffect, useState } from 'react'
// redux
import { useDispatch, useSelector } from "react-redux";
import { CurrentWeather } from '../redux/reducer/WeatherSlice';
// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Weather from '../components/weather/Weather';

const Home = () => {
    const dispatch = useDispatch()
    const { loading, notFound } = useSelector((state) => state.weather)

    useLayoutEffect(() => {
        getCurrentLocation()
    }, [])

    async function getCurrentLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            dispatch(CurrentWeather(data.city))
        } catch (error) {
            console.error('IP geolocation error:', error);
        }
    }

    return (
        <div className="d-flex flex-column">
            <Header handleLocation={handleLocation} />
            <div className="flex-grow-1">
                {!loading && !notFound && <Weather />}
                {notFound && <div className='bg-white text-center my-3 p-3 rounded'><p className='m-0 h4'>{notFound}</p></div>}
            </div>
            <Footer />
        </div>
    )
}

export default Home