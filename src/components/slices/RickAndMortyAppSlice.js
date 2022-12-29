import { createSlice } from '@reduxjs/toolkit';

export const RickAndMortyAppSlice = createSlice({
  name: 'rick-and-morty-app-slice',
  initialState: {
    randomCharacterList: [],
  },
  reducers: {
    setRandomCharacterList: (state, action) => {
      state.randomCharacterList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRandomCharacterList } = RickAndMortyAppSlice.actions;

export default RickAndMortyAppSlice.reducer;
