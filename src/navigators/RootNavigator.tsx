import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import GuestNavigator from "./GuestNavigator";

const RootNavigator = createSwitchNavigator({
  Guest: GuestNavigator,
});

export default createAppContainer(RootNavigator);
