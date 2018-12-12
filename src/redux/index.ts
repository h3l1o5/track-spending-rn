import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

import reducers from "./reducers";
import epics from "./epics";

const rootReducer = persistCombineReducers(
  {
    key: "root",
    storage: AsyncStorage,
    whitelist: [],
  },
  reducers
);

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];

const store = createStore(
  rootReducer,
  __DEV__ ? composeWithDevTools(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)
);

epicMiddleware.run(combineEpics(...epics));

export default { store, persistor: persistStore(store) };
