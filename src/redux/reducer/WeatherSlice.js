import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const CurrentWeather = createAsyncThunk(
    "weather/CurrentWeather",
    async (city, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const SearchWeather = createAsyncThunk(
    "weather/SearchWeather",
    async (city, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const WeatherSlice = createSlice({
    name: 'weather',
    initialState: {
        loading: true,
        searchValue: '',
        currentWeather: [],
        searchWeather: [],
        notFound: ''
    },
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        }
    },
    extraReducers: {
        [CurrentWeather.fulfilled]: (state, action) => {
            state.loading = false
            state.currentWeather = action.payload
        },
        [CurrentWeather.rejected]: (state, action) => {
            state.notFound = action.payload.message
        },
        [SearchWeather.pending]: (state, action) => {
            state.loading = true
        },
        [SearchWeather.fulfilled]: (state, action) => {
            state.loading = false
            state.weatherData = action.payload
        },
        [SearchWeather.rejected]: (state, action) => {
            state.notFound = action.payload.message
        },
    }
})

export const { setSearchValue } = WeatherSlice.actions
export default WeatherSlice.reducer
