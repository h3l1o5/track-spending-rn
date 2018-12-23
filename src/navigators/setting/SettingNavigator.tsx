import React from "react";
import { createStackNavigator, NavigationInjectedProps } from "react-navigation";

import color from "../../theme/color";

import Setting from "../../screens/setting/Setting";
import LabelList from "../../screens/setting/LabelList";
import LabelManager from "../../screens/setting/LabelManager";
import NavigationHeaderButton from "../../components/NavigationHeaderButton";

export default createStackNavigator(
  {
    Setting: {
      screen: Setting,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        title: "設定",
        headerTitleStyle: { color: "transparent" },
        headerTransparent: true,
      }),
    },
    LabelList: {
      screen: LabelList,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        title: "管理標籤",
        headerTitleStyle: { color: color.primary },
        headerBackTitleStyle: { color: color.dark },
        headerTintColor: color.dark,
        headerStyle: { backgroundColor: color.light, borderBottomWidth: 0 },
        headerRight: (
          <NavigationHeaderButton
            iconType="MaterialIcons"
            iconName="add-circle-outline"
            onPress={() => navigation.navigate("LabelManager", { mode: "create" })}
          />
        ),
      }),
    },
    LabelManager: {
      screen: LabelManager,
      navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
        title: navigation.getParam("mode") === "create" ? "新增標籤" : "編輯標籤",
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
