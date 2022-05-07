import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { fullscreen: false, collapsed: false },
  reducers: {
    toggleFullscreen(state) {
      state.fullscreen = !state.fullscreen;
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
