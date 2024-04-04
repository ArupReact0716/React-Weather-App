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

    // state
    const [currentLocation, setCurrentLocation] = useState({ country: '', state: '', city: '' })
    // const [location, setLocation] = useState('bangalore')

    // useEffect(() => {
    //     dispatch(CurrentWeather(location))
    // }, [dispatch, location])

    // handle search input value
    const handleLocation = (city) => {
        setLocation(city)
    }

    useLayoutEffect(() => {
        getCurrentLocation()
    }, [])

    async function getCurrentLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            setCurrentLocation({
                country: data.country_name,
                state: data.region_name,
                city: data.city,
            });
        } catch (error) {
            console.error('IP geolocation error:', error);
        }
    }

    return (
        <div className="d-flex flex-column">
            <Header handleLocation={handleLocation} />
            <div className="flex-grow-1">
                {loading === false && <Weather />}
                {notFound && <div className='bg-white text-center my-3 p-3 rounded'><p className='m-0 h4'>{notFound}</p></div>}
            </div>
            <Footer />
        </div>
    )
}

export default Home