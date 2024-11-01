import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
// import CartReducer from '@/reducers/cart.slice'

import { FavoriteReducer } from "./favorite.slice";
import { apiSlice } from "./api.slice";

export const store = configureStore({
  reducer: {
    favorite: FavoriteReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const makeStore = () => store;
export type AppState = ReturnType<typeof makeStore>;
 
