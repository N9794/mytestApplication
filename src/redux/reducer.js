import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage:null
}

const sliceReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    
    setSelectedImage(state, action) {
      state.selectedImage = action.payload
    }

  }
})

export const {
  setSelectedImage
} = sliceReducer.actions;
export default sliceReducer.reducer;
