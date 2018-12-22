import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import History from "../../screens/history/History";
import ChooseLocation from "../../screens/shared/ChooseLocation";
import EditSpending from "../../screens/history/EditSpending";

export default createStackNavigator(
  {
    History,
    ChooseLocation,
    EditSpending,
  },
  {
    headerMode: "float",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
