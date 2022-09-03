/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchUserById = createAsyncThunk(
  'statistics/fetchUserById',
  async () => {
    const userId = localStorage.getItem('userId');
    const { access_token } = JSON.parse(userId);
    const response = await axios.get(routes.statisticsPath(), {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  },
);

const normalize = (payload) => payload.reduce((acc, statistic) => {
  const {
    id, short, target, counter,
  } = statistic;
  return { ...acc, ...{ [id]: { short, target, counter } } };
}, {});

const usersAdapter = createEntityAdapter();

const counterSlice = createSlice({
  name: 'statistics',
  initialState: usersAdapter.getInitialState({ status: null, error: null, statistics: {} }),
  reducers: {
    addSqueeze: (state, action) => {
      const { id, ...data } = action.payload;
      state.statistics[id] = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.statistics = normalize(action.payload);
        state.status = 'resolved';
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { addSqueeze } = counterSlice.actions;

export default counterSlice.reducer;
