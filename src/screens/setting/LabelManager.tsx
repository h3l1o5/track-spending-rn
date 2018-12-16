import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationScreenConfig, NavigationScreenOptions } from "react-navigation";
import color from "../../theme/color";

export class LabelManager extends Component {
  public static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({ navigation }) => ({
    title: navigation.getParam("mode") === "create" ? "新增標籤" : "",
    headerTitleStyle: { color: color.primary },
    headerBackTitleStyle: { color: color.dark },
    headerTintColor: color.dark,
    headerStyle: { backgroundColor: color.light, borderBottomWidth: 0 },
  });

  public render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default LabelManager;
