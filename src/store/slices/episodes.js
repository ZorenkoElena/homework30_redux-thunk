import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const episodeSlice = createSlice({
  name: 'episodes',
  initialState: {
    isLoading: false,
    errorInListOfEpisodes: null,
    listOfEpisodes: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getListOfEpisodesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOfEpisodesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listOfEpisodes = action.payload;
    });
    builder.addCase(getListOfEpisodesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errorInListOfEpisodes = action.error.message;
    });
  },
});

export const getListOfEpisodesAsync = createAsyncThunk('episodes/getListOfEpisodesAsync', async (page) => {
  const res = await axios(`episode?page=${page}`);
  const data = await res.data;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
});

export default episodeSlice.reducer;
