import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    id: string | null,
    name: string | null,
    email: string | null,
    accessToken: string | null,
    refreshToken: string | null,
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    accessToken: null,
    refreshToken: null
}

const userAuth = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload }
        },
        clearUser: (state) => {
            return initialState
        }
    }
})


export const { clearUser, setUser } = userAuth.actions;
export default userAuth.reducer;