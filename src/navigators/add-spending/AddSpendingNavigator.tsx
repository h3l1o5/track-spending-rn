import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import AddSpending from "../../screens/add-spending/AddSpending";

export default createStackNavigator(
  {
    AddSpending,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
