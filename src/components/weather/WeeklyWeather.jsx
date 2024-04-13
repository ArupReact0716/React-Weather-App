import React from 'react'
// redux
import { useSelector } from "react-redux";
import WeatherItem from './WeatherItem';

const WeeklyWeather = () => {
   const { currentWeather: weatherData } = useSelector((state) => state.weather)

   return (
      <>
         <div className="bg-white bg-opacity-50 my-3 p-4 rounded">
            <h5 className='mb-4'>Extended Forecast</h5>
            <div className="weekly-weather-data w-100">
               <div className="d-flex">
                  {
                     weatherData.list && weatherData.list?.map((item, i) => {
                        return (
                           <WeatherItem key={i} data={item} />
                        )
                     })
                  }
               </div>
            </div>
         </div>
      </>
   )
}

export default WeeklyWeather