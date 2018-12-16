import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

import rootReducer from "./reducers";
import rootEpic from "./epics";

// AsyncStorage.clear();
const rootReducerWithPersist = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["setting", "spendingLabel", "consumption"],
  },
  rootReducer
);

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];

const store = createStore(
  rootReducerWithPersist,
  __DEV__ ? composeWithDevTools(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)
);

epicMiddleware.run(combineEpics(rootEpic));

export default { store, persistor: persistStore(store) };
