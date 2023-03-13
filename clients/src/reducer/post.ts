import { Reducer } from "redux";
import { Action } from "redux-ts";
const initialState = { Posts: [] };

export const postReducer: Reducer<any, Action<any>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "test":
      return {
        ...state,
      };

    default:
      return state;
  }
};
