import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import timerReducer from './timer';
import tasksReducer from './tasks';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['timer', 'tasks'],
};

const reducer = combineReducers({
  timer: timerReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
