import React, { useState } from 'react'
// reactstrap
import { Input, InputGroup } from 'reactstrap'
// icons
import { BsSearch } from 'react-icons/bs';

const Header = ({ handleLocation }) => {

    // state
    const [searchData, setSearchData] = useState('')
    const handleForm = (e) => {
        e.preventDefault()
        handleLocation(searchData)
    }
    return (
        <>
            <div className="text-center mb-4">
                <h4>Weather Application</h4>
            </div>
            <div className="search-box bg-white">
                <form onSubmit={e => handleForm(e)}>
                    <InputGroup className='align-items-center'>
                        <BsSearch size='20' />
                        <Input type='text' placeholder='Search by City' onChange={(e) => setSearchData(e.target.value)} />
                        <button type='submit' className='bg-transparent'>Search</button>
                    </InputGroup>
                </form>
            </div>
        </>
    )
}

export default Header