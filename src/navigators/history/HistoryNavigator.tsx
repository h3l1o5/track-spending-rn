import React from "react";
import { createStackNavigator, NavigationInjectedProps } from "react-navigation";

import color from "../../theme/color";

import History from "../../screens/history/History";
import ChooseLocation from "../../screens/shared/ChooseLocation";
import EditSpending from "../../screens/history/EditSpending";
import EditLabel from "../../screens/history/EditLabel";

export default createStackNavigator(
  {
    History,
    ChooseLocation: {
      screen: ChooseLocation,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        headerTransparent: true,
        header: null,
      }),
    },
    EditSpending,
    EditLabel,
  },
  {
    headerMode: "float",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
