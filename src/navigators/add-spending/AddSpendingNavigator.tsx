import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import AddSpending from "../../screens/add-spending/AddSpending";
import ChooseLocation from "../../screens/add-spending/ChooseLocation";

export default createStackNavigator(
  {
    AddSpending,
    ChooseLocation,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
