import React from 'react'

const WeatherItem = ({ data }) => {

    const weekday = new Date(data.dt * 1000).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).slice(0, 3)

    return (
        <div className='single-weekday gap-3'>
            <h6>{weekday}</h6>
            <img
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt='weather icon'
            />
            <p>{data.weather[0].main}</p>
            <ul className='d-flex list-unstyled align-items-center justify-content-center  mxs-auto p-0'>
                <li>{Math.floor(data.temp.max)}<sup>o</sup>C</li>
                <li>/</li>
                <li>{Math.floor(data.temp.min)}<sup>o</sup>C</li>
            </ul>
        </div>
    )
}

export default WeatherItem