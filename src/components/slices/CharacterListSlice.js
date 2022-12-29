import { createSlice } from '@reduxjs/toolkit';

export const CharacterListSlice = createSlice({
  name: 'character-list',
  initialState: {
    characterList: [],
    info: {},
  },
  reducers: {
    setCharacterList: (state, action) => {
      state.characterList = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCharacterList, setInfo } = CharacterListSlice.actions;

export default CharacterListSlice.reducer;
