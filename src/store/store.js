import { configureStore } from '@reduxjs/toolkit';

import episodeSlice from './slices/episodes';
import heroSlice from './slices/heroes.js';

export const store = configureStore({
  reducer: {
    episodes: episodeSlice,
    heroes: heroSlice,
  },
});
