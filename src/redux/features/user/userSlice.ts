import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ReduxState } from "../../app/store";

export interface User {
  id: number;
  username: string;
  email: string;
  alamat: string;
  noWa: string;
  role: string;
  pembelian: [];
}

export interface TInitialState {
  loading: boolean;
  users: User | null;
  error: string | undefined;
}

const initialState: TInitialState = {
  loading: false,
  users: {
    id: 1,
    username: "",
    alamat: "",
    role: "",
    email: "",
    noWa: "",
    alur: {
      progressAlur: 0,
    },
    pembelian: {
      
    },
    pengembalian: {
      nama: ""
    }
  },
  error: "",
};

// Generates pending, fullfilled, and rejected action types
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  // const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  // return res.data.map((user: User) => user.id);
  // return res.data;

  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data);
});

// export const fetchUsers = createAppAsyncThunk("user/fetchUsers", async () => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/users");
//   return res.data.map((user: User) => user.id);
// });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User>) => {
        // (state, action: PayloadAction<any>) => {

        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = null;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;

export const userIsLoading = (state: ReduxState) => state.user.loading;
export const userError = (state: ReduxState) => state.user.error;
export const selectAllUsers = (state: ReduxState) => state.user.users;
export const User = (state: ReduxState) => state.user;
