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
    const [location, setLocation] = useState('bangalore')

    useEffect(() => {
        dispatch(CurrentWeather(location))
    }, [dispatch,location])

    // handle search input value
    const handleLocation = (city) => {
        setLocation(city)
    }

    return (
        <>
            <Header handleLocation={handleLocation} />

            {loading === false && <Weather />}

            {loading && notFound &&
                <div className='bg-white text-center my-3 p-3 rounded'><p className='m-0 h4'>{notFound}</p></div>
            }

            <Footer />
        </>
    )
}

export default Home