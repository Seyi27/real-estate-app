import { createSlice } from '@reduxjs/toolkit'

const initialState: CounterState = {
  favorite: [],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favorite=[...state.favorite, action.payload];
    },
    removeFromFavorite: (state, action) => {
       const index = state.favorite.findIndex(
        (item) => item.id === action.payload.id
       );

       let newFavorite = [...state.favorite];

       if(index >= 0){
        newFavorite.splice(index, 1)
       }else{
        console.warn(
          `cant remove product {id: ${action.payload.id}} as its not in basket`
        );
       }
       state.favorite = newFavorite;

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions

export const selectFavorite= (state) => state.favorite.favorite;


export default favoriteSlice.reducer