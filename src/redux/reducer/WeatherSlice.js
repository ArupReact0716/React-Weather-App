import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const CurrentWeather = createAsyncThunk(
   "weather/CurrentWeather",
   async (city, { rejectWithValue }) => {
      try {
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=e8bcb8ed34c76adf0610265917374452`)
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
         state.notFound = ''

      },
      [CurrentWeather.rejected]: (state, action) => {
         state.notFound = action.payload.message
      },

   }
})

export const { setSearchValue } = WeatherSlice.actions
export default WeatherSlice.reducer
