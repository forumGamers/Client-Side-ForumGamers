import { Reducer } from "redux";
import { Action } from "redux-ts";
const initialState = { Stores: [] };

export const storeReducer: Reducer<any, Action<any>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "tes":
      return {
        ...state,
      };

    default:
      return state;
  }
};
