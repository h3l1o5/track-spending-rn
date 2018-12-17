import React, { Component } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { NavigationScreenConfig, NavigationScreenOptions } from "react-navigation";
import { Content, Button, ActionSheet } from "native-base";

import { CATEGORIES } from "../../constants";
import color from "../../theme/color";
import { Category } from "../../typings";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";

interface State {
  selectedCategory: Category;
}

export class LabelManager extends Component {
  public static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({ navigation }) => ({
    title: navigation.getParam("mode") === "create" ? "新增標籤" : "",
    headerTitleStyle: { color: color.primary },
    headerBackTitleStyle: { color: color.dark },
    headerTintColor: color.dark,
    headerStyle: { backgroundColor: color.light, borderBottomWidth: 0 },
  });

  public state: State = {
    selectedCategory: "food",
  };

  public handleCategoryPressed = () => {
    ActionSheet.show(
      {
        options: [
          ...CATEGORIES.map(category => `${getCategoryIcon(category)}${getCategoryMandarin(category)}`),
          "取消",
        ],
        cancelButtonIndex: CATEGORIES.length,
      },
      buttonIndex => {
        if (buttonIndex === CATEGORIES.length) {
          return;
        }
        this.setState({ selectedCategory: CATEGORIES[buttonIndex] });
      }
    );
  };

  public render() {
    const { selectedCategory } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}>
          <View style={{ padding: 35, flex: 1 }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: color.secondary }}>類別</Text>
            <TouchableOpacity onPress={this.handleCategoryPressed}>
              <Text style={{ padding: 20, fontSize: 28, color: color.gray }}>
                {getCategoryIcon(selectedCategory)}
                {getCategoryMandarin(selectedCategory)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 35, flex: 1 }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: color.secondary }}>名稱</Text>
            <Text style={{ padding: 20, fontSize: 28, color: color.gray }}>12345</Text>
          </View>
          {/* <Button bordered danger block style={{ marginHorizontal: 40, marginTop: 20 }}>
            <Text style={{ color: color.red }}>刪除</Text>
          </Button> */}
          <Button block style={{ margin: 40, marginTop: 20, backgroundColor: color.primary }}>
            <Text style={{ color: color.white }}>新增</Text>
          </Button>
        </Content>
      </SafeAreaView>
    );
  }
}

export default LabelManager;
