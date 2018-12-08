import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../theme/color";

import Guest from "../screens/guest/Guest";

export default createStackNavigator(
  {
    Guest,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.primary,
    },
  }
);
