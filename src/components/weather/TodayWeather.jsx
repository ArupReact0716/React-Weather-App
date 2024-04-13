import React from 'react'
// redux
import { useSelector } from "react-redux";
//icon
import { WiHumidity, WiCloudyGusts, WiThermometer, WiSunrise, WiSunset } from 'react-icons/wi';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const TodayWeather = () => {
   const { loading, searchValue, currentWeather, searchWeather } = useSelector((state) => state.weather)
   const weatherData = currentWeather


   const sunset = Object.keys(weatherData).length ? new Date(weatherData?.list[0].sunset * 1000).toLocaleTimeString().slice(0, 4) : ''
   const sunrise = Object.keys(weatherData).length ? new Date(weatherData?.list[0]?.sunrise * 1000).toLocaleTimeString().slice(0, 4) : ''

   return (
      <>
         <div className="current-weather-wrap p-4 bg-white my-3 rounded">
            {
               Object.keys(weatherData).length  &&
               <div className="row g-4">
                  <div className="col-12 col-md-7">
                     <div className="current-location">
                        <span>{weatherData?.city?.name},</span>
                        <span> {weatherData?.city?.country}</span>
                     </div>
                     <div className="d-flex align-items-center">
                        <div className='weather-img'>
                           <img
                              src={`https://openweathermap.org/img/w/${weatherData?.list[0]?.weather[0]?.icon}.png`}
                              alt='weather icon'
                           />
                        </div>
                        <div className="current-temp ms-3">
                           <div className="">
                              <span>{Math.floor(weatherData?.list[0]?.temp?.day)}</span>
                              <sup>o</sup>
                              <span>C</span>
                           </div>
                        </div>
                     </div>
                     <div className="current-desc">
                        <span>{weatherData?.list[0]?.weather[0]?.main}</span>,
                        <span> {weatherData?.list[0]?.weather[0]?.description}</span>
                     </div>
                  </div>
                  <div className="col-12 col-md-5">
                     <div className="h-100">
                        <ul className='list-unstyled d-flex align-items-center'>
                           <li className='me-3'><WiSunrise size='25' /> {sunrise} A.M</li>
                           <li className='ms-3'><WiSunset size='25' /> {sunset} P.M</li>
                        </ul>
                        <div className="mb-2">
                           <span>Feels Like</span>
                           <span className='ms-3'>{Math.floor(weatherData?.list[0]?.feels_like?.day)}<sup>o</sup></span>
                        </div>
                        <div className="d-flex align-items-center mb-4">
                           <div className="d-flex align-items-center me-3">
                              <MdArrowUpward size='20' />
                              <span>
                                 {Math.floor(weatherData?.list[0]?.temp.max)}
                                 <sup>o</sup>
                              </span>
                           </div>
                           <div className="d-flex align-items-center">
                              <MdArrowDownward size='20' />
                              <span>
                                 {Math.floor(weatherData?.list[0]?.temp.min)}
                                 <sup>o</sup>
                              </span>
                           </div>
                        </div>
                        <ul className='list-unstyled'>
                           <li className='d-flex align-items-center mb-2'>
                              <WiHumidity className='me-1' size='20' />
                              Humidity
                              <span className='ms-3'>{weatherData?.list[0]?.humidity}%</span>
                           </li>
                           <li className='d-flex align-items-center mb-2'>
                              <WiCloudyGusts className='me-1' size='20' />
                              Wind
                              <span className='ms-3'>{weatherData?.list[0]?.speed}m/s</span>
                           </li>
                           <li className='d-flex align-items-center mb-2'>
                              <WiThermometer className='me-1' size='20' />
                              Pressure
                              <span className='ms-3'>{weatherData?.list[0]?.pressure} hPa</span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            }
         </div>
      </>
   )
}

export default TodayWeather