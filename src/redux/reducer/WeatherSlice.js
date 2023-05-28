import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const CurrentWeather = createAsyncThunk(
    "weather/CurrentWeather",
    async (location, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`)
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
        weatherData: [],
        notFound: ''
    },
    extraReducers: {
        [CurrentWeather.fulfilled]: (state, action) => {
            state.loading = false
            state.weatherData = action.payload
        },
        [CurrentWeather.rejected]: (state, action) => {
            state.loading = true
            state.weatherData = []
            state.notFound = action.payload.message
        },
    }
})
export default WeatherSlice.reducer
