import React from "react";
import { createBottomTabNavigator, NavigationInjectedProps } from "react-navigation";
import { Icon } from "native-base";

import color from "../theme/color";

import AddSpendingNavigator from "./add-spending/AddSpendingNavigator";
import HistoryNavigator from "./history/HistoryNavigator";
import StatsNavigator from "./stats/StatsNavigator";
import SettingNavigator from "./setting/SettingNavigator";

export default createBottomTabNavigator(
  {
    AddSpending: {
      screen: AddSpendingNavigator,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        tabBarLabel: "記帳",
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon type="MaterialIcons" name="add-circle" style={{ color: tintColor }} />
        ),
        tabBarVisible: navigation.state.index === 0,
      }),
    },
    History: {
      screen: HistoryNavigator,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        tabBarLabel: "歷史紀錄",
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon type="FontAwesome" name="book" style={{ color: tintColor }} />
        ),
        tabBarVisible: navigation.state.index === 0,
      }),
    },
    Stats: {
      screen: StatsNavigator,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        tabBarLabel: "圖表",
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon type="FontAwesome" name="pie-chart" style={{ color: tintColor }} />
        ),
        tabBarVisible: navigation.state.index === 0,
      }),
    },
    Setting: {
      screen: SettingNavigator,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        tabBarLabel: "設定",
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon type="Ionicons" name="md-settings" style={{ color: tintColor }} />
        ),
        tabBarVisible: navigation.state.index === 0,
      }),
    },
  },
  {
    tabBarOptions: {
      inactiveTintColor: color.dark,
      activeTintColor: color.secondary,
      tabStyle: { marginVertical: 4 },
      style: { height: 55, backgroundColor: color.light },
    },
  }
);
