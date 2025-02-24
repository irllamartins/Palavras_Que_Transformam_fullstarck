import { Ranking }from "../../application/model/ranking"
import { IComponentState } from "../root.types"

export interface IRankingState {
    readonly user: IUseState
    readonly years: IListState
    readonly weekly: IListState
}
export interface IUseState extends IComponentState {
    readonly yearsPosition: number
    readonly weeklyPosition:number
}
export interface IListState extends IComponentState {
    readonly list: Ranking[] | []
}

export interface IActionListRanking {
    readonly list: Ranking[]
}

export interface IActionUserRanking {
    readonly yearsPosition: number
    readonly weeklyPosition:number
}