import { createSlice } from '@reduxjs/toolkit';

export const EpisodeDetailsSlice = createSlice({
  name: 'episode-details',
  initialState: {
    episodeDetails: {
      air_date: '',
      characters: [],
      id: '',
      name: '',
    },
  },
  reducers: {
    setEpisodeDetails: (state, action) => {
      state.episodeDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEpisodeDetails } = EpisodeDetailsSlice.actions;

export default EpisodeDetailsSlice.reducer;
