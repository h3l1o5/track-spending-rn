import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import History from "../../screens/history/History";
import ChooseLocation from "../../screens/shared/ChooseLocation";

export default createStackNavigator(
  {
    History,
    ChooseLocation,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
