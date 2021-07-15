import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toRead: []
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.toRead.push({...action.payload, read: false});
    },
    markAsRead: (state, action) => {
      let book = state.toRead.filter(item => item.key === action.payload);
      book[0].read = !book[0].read;
    }
  }
});

export const { addBook, markAsRead } = bookSlice.actions;

export const selectBooks = (state) => state.books.toRead;

export default bookSlice.reducer;
