import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/client";

const initialState = {
  user: null,
  status: "idle", // 'success' | 'failed' | 'pending' | 'idle'
  error: null,
  isLoggedIn: false,
};

// async action
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      // TODO: make axios call to /login
      const res = await api.post("/login", { email, password });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  },
);

export const fetchMe = createAsyncThunk("auth/fetchMe", async (thunkAPI) => {
  try {
    const res = await api.get("/me");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Fetch failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    function pending(state) {
      state.status = "pending";
    }
    function failed(state, action) {
      state.status = "failed";
      state.error = action.payload;
      state.user = null;
      state.isLoggedIn = false;
    }
    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, failed);
  },
});

const reducer = authSlice.reducer;
export default reducer;
