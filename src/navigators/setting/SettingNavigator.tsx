import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import Setting from "../../screens/setting/Setting";

export default createStackNavigator(
  {
    Setting,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
