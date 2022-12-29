import { createSlice } from '@reduxjs/toolkit';

export const LocationDetailsSlice = createSlice({
  name: 'location-details',
  initialState: {
    locationDetails: {
      dimension: '',
      id: '',
      name: '',
      residents: [],
      type: '',
    },
  },
  reducers: {
    setLocationDetails: (state, action) => {
      state.locationDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocationDetails } = LocationDetailsSlice.actions;

export default LocationDetailsSlice.reducer;
