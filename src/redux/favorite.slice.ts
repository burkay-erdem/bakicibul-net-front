import { createSlice } from "@reduxjs/toolkit";

interface IFavoriteState {
  favorites: number[];
}

const initialState: IFavoriteState = {
  favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]'),
};

const FavoriteSlice = createSlice({
  name: "Favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const favorites = [...state.favorites, action.payload]
      localStorage.setItem('favorites', JSON.stringify(favorites))

      return { favorites: favorites };
    },
    removeToFavorite: (state, action) => {
      const favorites = state.favorites.filter(x => x !== action.payload)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      return { favorites: favorites };
    },

  },
});

export const FavoriteReducer = FavoriteSlice.reducer;

export const { removeToFavorite, addToFavorite } = FavoriteSlice.actions;
