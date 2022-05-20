import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appApi from './services/appApi';

// Persist our store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// reducers







