import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

 const emailIdSlice = createSlice({
    name: 'emailidlist',
    initialState:{
      value:null
    },
  
    reducers: {
      fillEmailIdList: (state,action) => {
        state.value = action.payload
      },
      emptyEmailIdList: (state) => {
        state.value = null
      }, 
    }
   
  });
  
  export const { fillEmailIdList, emptyEmailIdList } = emailIdSlice.actions;
  
  export const selectEmailIdlist = (state) => state.emailidlist.value;  
  
  export default emailIdSlice.reducer;