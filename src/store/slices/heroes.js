import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const heroSlice = createSlice({
  name: 'heroes',
  initialState: {
    isLoading: false,
    isLoadingHero: false,
    listOfHeroes: [],
    errorInListOfHeroes: null,
    selectedHero: null,
    errorInSelectedHero: null,
  },
  reducers: {
    closeSelectedHero: (state) => {
      state.selectedHero = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getListOfHeroesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOfHeroesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listOfHeroes = action.payload;
    });
    builder.addCase(getListOfHeroesAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errorInListOfHeroes = action.error.message;
    });

    builder.addCase(getHeroByIdAsync.pending, (state) => {
      state.isLoadingHero = true;
    });
    builder.addCase(getHeroByIdAsync.fulfilled, (state, action) => {
      state.isLoadingHero = false;
      state.selectedHero = action.payload;
    });
    builder.addCase(getHeroByIdAsync.rejected, (state, action) => {
      state.isLoadingHero = false;
      state.errorInListOfHeroes = action.error.message;
    });
  },
});

export const { closeSelectedHero } = heroSlice.actions;

export const getListOfHeroesAsync = createAsyncThunk('heroes/fetchCharacters', async (page) => {
  const res = await axios(`character?page=${page}`);
  const data = await res.data;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('listOfHeroes', data);
  return data;
});

export const getHeroByIdAsync = createAsyncThunk('heroes/getHeroByIdAsync', async (id) => {
  try {
    const res = await axios(`character/${id}`);
    const data = await res.data;
    console.log('selectedHero', data);
    return data;
  } catch (error) {
    return error.message;
  }
});

export default heroSlice.reducer;
