import { configureStore } from '@reduxjs/toolkit'
import favoriteSlice from './features/favoriteSlice'

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice
  },
})