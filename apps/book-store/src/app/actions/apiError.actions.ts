import { Action } from '@ngrx/store';

export enum ErrorEnums {
    APIError = '[Service] APIError'
}

export class ErrorAction implements Action {
    readonly type:string;
    payload: any;
}

export class APIErrorAction implements ErrorAction {
    readonly type = ErrorEnums.APIError;

    constructor( public payload: any ) {}
}