import {applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import postreducer from "./reducers/reducer";

const store = createStore(postreducer,applyMiddleware(thunk));
export default store;
