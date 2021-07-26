import { Subject } from "rxjs";

export enum ACTION {
  VISIBLE_ITEM,
  GET_ITEMS
}

export type Action = {
  type: ACTION
  payload: any
}

export type ActionType = {
  type: ACTION.VISIBLE_ITEM,
  payload: {
    visible: boolean,
    className: string,
    id: number
  }
} | {
  type: ACTION.GET_ITEMS,
  payload: string
}

export const papersub = new Subject<ActionType>()

