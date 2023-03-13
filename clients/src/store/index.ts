import thunk from "redux-thunk";
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { userReducer } from "@/reducer/user";
import { storeReducer } from "@/reducer/store";
import { postReducer } from "@/reducer/post";

const rootReducer = combineReducers({
  user: userReducer,
  store: storeReducer,
  post: postReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
