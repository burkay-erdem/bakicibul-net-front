import { createSlice } from "@reduxjs/toolkit";

interface IFavoriteState {
  favorites: number[];
}

const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }
};


const initialState: IFavoriteState = {
  favorites: JSON.parse(safeLocalStorage.getItem('favorites') || '[]')
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
