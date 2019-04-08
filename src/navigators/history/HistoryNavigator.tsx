import React from "react";
import { createStackNavigator, NavigationInjectedProps } from "react-navigation";

import color from "../../theme/color";

import History from "../../screens/history/History";
import ChooseLocation from "../../screens/shared/ChooseLocation";
import EditSpending from "../../screens/history/EditSpending";
import EditLabel from "../../screens/history/EditLabel";

export default createStackNavigator(
  {
    History: {
      screen: History,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        headerTransparent: true,
        header: null,
      }),
    },
    ChooseLocation: {
      screen: ChooseLocation,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        headerTransparent: true,
        header: null,
      }),
    },
    EditSpending: {
      screen: EditSpending,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        title: "編輯消費金額",
        headerTitleStyle: { color: color.primary },
        headerBackTitleStyle: { color: color.dark },
        headerTintColor: color.dark,
        headerStyle: { backgroundColor: color.light, borderBottomWidth: 0 },
      }),
    },
    EditLabel: {
      screen: EditLabel,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        title: "編輯消費物品",
        headerTitleStyle: { color: color.primary },
        headerBackTitleStyle: { color: color.dark },
        headerTintColor: color.dark,
        headerStyle: { backgroundColor: color.light, borderBottomWidth: 0 },
      }),
    },
  },
  {
    headerMode: "float",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
