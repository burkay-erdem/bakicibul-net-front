"use client"; 
import { Provider } from "react-redux";
import React from "react"; 
import { IChildren } from "../interface/global";
import { store } from "../redux/store";

interface IReduxProvider extends IChildren {}
export const ReduxProvider: React.FC<IReduxProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
