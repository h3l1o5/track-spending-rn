import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import GuestNavigator from "./GuestNavigator";
import MainNavigator from "./MainNavigator";

const RootNavigator = createSwitchNavigator({
  Guest: GuestNavigator,
  Main: MainNavigator,
});

export default createAppContainer(RootNavigator);
