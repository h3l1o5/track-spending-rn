import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import AddSpending from "../../screens/add-spending/AddSpending";
import Map from "../../components/Map";

export default createStackNavigator(
  {
    AddSpending,
    Map,
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
