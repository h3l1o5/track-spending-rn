import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import History from "../../screens/history/History";

export default createStackNavigator(
  {
    History,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
