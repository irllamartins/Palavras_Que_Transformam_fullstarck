import { Action } from 'redux'

/**
 * State reducers
 */
export enum AsyncStateStatus {
    INITIAL = 'INITIAL',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

/**
 * Component State
 */
export interface IComponentState {
    readonly status: AsyncStateStatus
}


/**
 * Action type
 */
export interface IActionType<T = any> extends Action {
    payload: T
    error: boolean
    meta: any
}

/**
 * Axios response type
 */
export interface IAxiosResponse<T = any> {
    data: T
   // headers: any
}



