import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import Stats from "../../screens/stats/Stats";

export default createStackNavigator(
  {
    Stats,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
