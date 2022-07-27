import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthReducer } from './auth';
import { UsersReducer } from './users/users.reducers';
import { ProjectReducer } from './projects/projects.reducers';

// === List of all redducers
const AllReducers = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  projects: ProjectReducer
});

export const AppReducers = (state: any, action: any): StoreStateInterface => {
  return AllReducers(state, action);
};

// === LocalSotrage persist definition
const persistConfig = {
  key: 'my-app',
  storage,
  whitelist: ['auth', 'users', 'projects'],
};

const persistedReducer = persistReducer(persistConfig, AppReducers);

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export type StoreStateInterface = ReturnType<typeof AllReducers>;
