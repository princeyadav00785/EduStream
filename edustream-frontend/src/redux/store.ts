import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// Persist Config
const persistConfig = {
  key: "auth", 
  storage,
};

// User State Interface
interface UserState {
  isAuthenticated: boolean;
  userInfo: {
    name: string;
    id: string;
    role: string;
  } | null;
  token: string | null;
}

// Initial State
const initialState: UserState = {
  isAuthenticated: false,
  userInfo: null,
  token: null,
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userInfo: UserState["userInfo"]; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// Wrap Auth Reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

// Store Configuration
const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
