import { all, apply, put, takeLatest } from "redux-saga/effects";
import { IActionType, IAxiosResponse } from "../root.types";
import RankingService from "../../../service/ranking";
import { 
    rankingYearFailure,
    rankingYearRequest,
    rankingYearSuccess,
    rankingUserRequest,
    rankingWeeklyRequest,
    rankingUserFailure,
    rankingUserSuccess,
    rankingWeeklyFailure,
    rankingWeeklySuccess
 } from ".";


function* loadYears() {
     try {
        console.log("!entrou")
         const response: IAxiosResponse<any[]> = yield apply(
             RankingService,
             RankingService.getYears,         
             []
         )
         console.log("!saiu")
         yield put(rankingYearSuccess({list:response.data}))
     } catch (e) {
         yield put(rankingYearFailure())
     }
}
function* loadWeekly() {
    try {
        const response: IAxiosResponse<any[]> = yield apply(
            RankingService,
            RankingService.getWeekly,         
            []
        )
        yield put(rankingWeeklySuccess({list:response.data}))
    } catch (e) {
        yield put(rankingWeeklyFailure())
    }
}
function* loadUser() {
    try {
        const response: IAxiosResponse = yield apply(
            RankingService,
            RankingService.getUser,         
            []
        )
        yield put(rankingUserSuccess({data:response.data}))
    } catch (e) {
        yield put(rankingUserFailure())
    }
}
export default function* userSaga(): any {
    return yield all([
        takeLatest(rankingYearRequest.type, loadYears),
        takeLatest(rankingWeeklyRequest.type,  loadWeekly),
        takeLatest(rankingUserRequest.type, loadUser),
    ])
}