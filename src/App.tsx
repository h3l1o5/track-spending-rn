import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Root, StyleProvider } from "native-base";

import getTheme from "../native-base-theme/components";
import platform from "../native-base-theme/variables/platform";
import RootNavigator from "./navigators/RootNavigator";
import DataCenter from "./redux";

export default class App extends Component {
  public render() {
    return (
      <Root>
        <StyleProvider style={getTheme(platform)}>
          <Provider store={DataCenter.store}>
            <PersistGate persistor={DataCenter.persistor}>
              <RootNavigator />
            </PersistGate>
          </Provider>
        </StyleProvider>
      </Root>
    );
  }
}
