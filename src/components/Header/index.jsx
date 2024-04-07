import React, { useState } from 'react'
// redux
import { useDispatch, useSelector } from "react-redux";
import { SearchWeather, setSearchValue } from '../../redux/reducer/WeatherSlice';
// reactstrap
import { Input, InputGroup } from 'reactstrap'
// icons
import { BsSearch } from 'react-icons/bs';

const Header = () => {
    const dispatch = useDispatch()
    // state
    const [searchData, setSearchData] = useState('')
    const handleForm = (e) => {
        e.preventDefault()
        dispatch(SearchWeather(searchData))
    }

    const searchHandle = (e) => {
        e.preventDefault()
        setSearchData(e.target.value)

        if (e.target.value === '') {
            dispatch(setSearchValue(e.target.value))
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
                        <Input type='text' placeholder='Search by City' onChange={searchHandle} />
                        <button type='submit' className='bg-transparent'>Search</button>
                    </InputGroup>
                </form>
            </div>
        </>
    )
}

export default Header