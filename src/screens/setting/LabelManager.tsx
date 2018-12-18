import React, { Component } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenConfig, NavigationScreenOptions, NavigationScreenProp } from "react-navigation";
import { Content, Button, ActionSheet, Input, Toast } from "native-base";
import uuid from "uuid/v4";

import { CATEGORIES } from "../../constants";
import color from "../../theme/color";
import { Category, SpendingLabel } from "../../typings";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";
import { spendingLabelActionCreators } from "../../redux/reducers/spending-label.reducer";

interface State {
  isEditingName: boolean;
  selectedCategory: Category;
  name: string;
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
  createSpendingLabel: (spendingLabel: SpendingLabel) => void;
}

export class LabelManager extends Component<Props, State> {
  public static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({ navigation }) => ({
    title: navigation.getParam("mode") === "create" ? "新增標籤" : "編輯標籤",
    headerTitleStyle: { color: color.primary },
    headerBackTitleStyle: { color: color.dark },
    headerTintColor: color.dark,
    headerStyle: { backgroundColor: color.light, borderBottomWidth: 0 },
  });

  public state: State = {
    isEditingName: false,
    selectedCategory: "food",
    name: "",
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

  public handleSubmitPressed = () => {
    if (!this.state.name) {
      return Alert.alert("要幫標籤取個名字喔", "", [{ text: "好" }]);
    }

    if (this.props.navigation.getParam("mode") === "create") {
      this.props.createSpendingLabel({
        category: this.state.selectedCategory,
        name: this.state.name,
        id: uuid(),
        createdAt: new Date(),
      });

      Toast.show({
        type: "success",
        text: "新增標籤成功👍",
        buttonText: "好",
        duration: 5000,
        position: "bottom",
      });

      this.props.navigation.goBack();
    }
  };

  public render() {
    const { selectedCategory, name, isEditingName } = this.state;

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
            {isEditingName ? (
              <Input
                defaultValue={name}
                onChangeText={name => this.setState({ name })}
                onEndEditing={() => {
                  this.setState({ isEditingName: false });
                }}
                autoFocus
                style={[
                  {
                    flex: undefined,
                    height: "auto",
                    width: "100%",
                    paddingLeft: 20,
                    paddingTop: 20,
                    fontSize: 28,
                    color: color.gray,
                  },
                ]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.setState({ isEditingName: true })}>
                <Text numberOfLines={1} style={{ padding: 20, fontSize: 28, color: color.gray }}>
                  {name || "無"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <Button bordered danger block style={{ marginHorizontal: 40, marginTop: 20 }}>
            <Text style={{ color: color.red }}>刪除</Text>
          </Button> */}
          <Button
            block
            style={{ margin: 40, marginTop: 20, backgroundColor: color.primary }}
            onPress={this.handleSubmitPressed}
          >
            <Text style={{ color: color.white }}>新增</Text>
          </Button>
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect(
  null,
  {
    createSpendingLabel: spendingLabelActionCreators.createSpendingLabel,
  }
)(LabelManager);
