import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncStateStatus } from '../root.types'
import { IActionListRanking, IActionUserRanking, IRankingState } from './types'

const initialState: IRankingState = {
    user: {
        yearsPosition: 0,
        weeklyPosition: 0,
        status: AsyncStateStatus.INITIAL
    },
    years: {
        list: [],
        status: AsyncStateStatus.INITIAL
    },
    weekly: {
        list: [],
        status: AsyncStateStatus.INITIAL
    }

}

export const RankingSlice = createSlice({
    name: '@ranking',
    initialState,
    reducers: {
        rankingYearRequest(state) {
            state.years.status = AsyncStateStatus.LOADING
        },
        rankingYearSuccess(state, action: PayloadAction<IActionListRanking>) {
            const { list } = action.payload
            state.years.list = list
            state.years.status = AsyncStateStatus.SUCCESS
        },
        rankingYearFailure(state) {
            state.years.list = []
            state.years.status = AsyncStateStatus.FAILURE
        },
        rankingWeeklyRequest(state) {
            state.weekly.status = AsyncStateStatus.LOADING
        },
        rankingWeeklySuccess(state, action: PayloadAction<any>) {
            const { list } = action.payload
            state.weekly.list = list
            state.weekly.status = AsyncStateStatus.SUCCESS
        },
        rankingWeeklyFailure(state) {
            state.weekly.list = []
            state.weekly.status = AsyncStateStatus.FAILURE
        },
        rankingUserRequest(state) {
            state.user.status = AsyncStateStatus.LOADING
        },
        rankingUserSuccess(state, action: PayloadAction<{data:IActionUserRanking}>) {
            const { data } = action.payload
            state.user.weeklyPosition = data.weeklyPosition
            state.user.yearsPosition = data.yearsPosition
            state.user.status = AsyncStateStatus.SUCCESS
        },
        rankingUserFailure(state) {
            state.weekly.status = AsyncStateStatus.FAILURE
        },

    }
})

export const {
    rankingUserFailure,
    rankingWeeklyFailure,
    rankingUserRequest,
    rankingUserSuccess,
    rankingWeeklyRequest,
    rankingWeeklySuccess,
    rankingYearFailure,
    rankingYearRequest,
    rankingYearSuccess
} = RankingSlice.actions

export default RankingSlice.reducer
