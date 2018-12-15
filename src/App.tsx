import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Root } from "native-base";

import RootNavigator from "./navigators/RootNavigator";
import DataCenter from "./redux";

export default class App extends Component {
  public render() {
    return (
      <Root>
        <Provider store={DataCenter.store}>
          <PersistGate persistor={DataCenter.persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
