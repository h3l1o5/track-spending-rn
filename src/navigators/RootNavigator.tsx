import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import MainNavigator from "./MainNavigator";
import Landing from "../screens/Landing";

const RootNavigator = createSwitchNavigator({
  Landing,
  Main: MainNavigator,
});

export default createAppContainer(RootNavigator);
