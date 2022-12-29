import { createSlice } from '@reduxjs/toolkit';

export const EpisodeOrLocationCharacterProfileSlice = createSlice({
  name: 'episode-or-location-character-profile',
  initialState: {
    characterImg: '',
    characterName: '',
    characterStatus: '',
    characterSpecies: '',
    characterGender: '',
    characterOrigin: '',
    characterLocation: '',
    characterType: '',
  },
  reducers: {
    setCharacterImg: (state, action) => {
      state.characterImg = action.payload;
    },
    setCharacterName: (state, action) => {
      state.characterName = action.payload;
    },
    setCharacterStatus: (state, action) => {
      state.characterStatus = action.payload;
    },
    setCharacterSpecies: (state, action) => {
      state.characterSpecies = action.payload;
    },
    setCharacterGender: (state, action) => {
      state.characterGender = action.payload;
    },
    setCharacterOrigin: (state, action) => {
      state.characterOrigin = action.payload;
    },
    setCharacterLocation: (state, action) => {
      state.characterLocation = action.payload;
    },
    setCharacterType: (state, action) => {
      state.characterType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCharacterImg,
  setCharacterName,
  setCharacterStatus,
  setCharacterSpecies,
  setCharacterGender,
  setCharacterOrigin,
  setCharacterLocation,
  setCharacterType,
} = EpisodeOrLocationCharacterProfileSlice.actions;

export default EpisodeOrLocationCharacterProfileSlice.reducer;
