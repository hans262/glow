import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Plane {
  editorType: string
  styles: {
    borderColor: string
  }
}

const initialState = {
  editorType: 'draw',
  styles: {
    borderColor: 'red'
  }
} as Plane

export const planeSlice = createSlice({
  name: 'plane',
  initialState,
  reducers: {
    switchEditorType: (state, action: PayloadAction<string>) => {
      state.editorType = action.payload
    }
  }
})

export const { switchEditorType } = planeSlice.actions

export default planeSlice.reducer