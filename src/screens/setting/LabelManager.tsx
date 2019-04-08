import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { Content, Button, ActionSheet, Toast } from "native-base";
import _ from "lodash";

import { CATEGORIES } from "../../constants";
import color from "../../theme/color";
import {
  Category,
  SpendingLabel,
  AppState,
  SpendingLabelCreateProperties,
  SpendingLabelUpdateProperties,
} from "../../typings";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";
import { spendingLabelActionCreators, spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import EditableText from "../../components/EditableText";
import { consumptionSelectors } from "../../redux/reducers/consumption.reducer";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  spendingLabel?: SpendingLabel;
  isSpendingLabelUsed?: boolean;
  createSpendingLabel: (spendingLabel: SpendingLabelCreateProperties) => void;
  updateSpendingLabel: (id: string, properties: SpendingLabelUpdateProperties) => void;
  deleteSpendingLabel: (id: string) => void;
}

const LabelManager = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [name, setName] = useState("");

  useEffect(
    () => {
      if (props.navigation.getParam("mode") === "edit" && props.spendingLabel) {
        setSelectedCategory(props.spendingLabel.category);
        setName(props.spendingLabel.name);
      }
    },
    [props.spendingLabel]
  );

  const handleCategoryPressed = () => {
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
        setSelectedCategory(CATEGORIES[buttonIndex]);
      }
    );
  };

  const handleSubmitPressed = () => {
    if (!name) {
      return Alert.alert("要幫標籤取個名字喔", "", [{ text: "好" }]);
    }

    const mode = props.navigation.getParam("mode");

    if (mode === "create") {
      props.createSpendingLabel({
        category: selectedCategory,
        name,
      });

      Toast.show({
        type: "success",
        text: "新增標籤成功👍",
        buttonText: "好",
        duration: 5000,
        position: "bottom",
      });

      props.navigation.goBack();
    }

    if (mode === "edit") {
      const id = _.get(props.spendingLabel, "id", "");

      props.updateSpendingLabel(id, { category: selectedCategory, name });

      Toast.show({
        type: "success",
        text: "編輯標籤成功👍",
        buttonText: "好",
        duration: 5000,
        position: "bottom",
      });

      props.navigation.goBack();
    }
  };

  const handleDeletePressed = () => {
    if (props.isSpendingLabelUsed) {
      return Alert.alert("無法刪除", "這個標籤被某些消費記錄使用中", [{ text: "好" }]);
    }

    Alert.alert("警告", "確定要刪除這個標籤嗎?", [
      {
        text: "確定",
        style: "destructive",
        onPress: () => {
          const id = _.get(props.spendingLabel, "id", "");

          props.deleteSpendingLabel(id);

          Toast.show({
            type: "success",
            text: "刪除標籤成功👍",
            buttonText: "好",
            duration: 5000,
            position: "bottom",
          });

          props.navigation.goBack();
        },
      },
      { text: "取消", style: "cancel" },
    ]);
  };

  const mode = props.navigation.getParam("mode");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}>
        <View style={{ padding: 35, flex: 1 }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: color.secondary }}>類別</Text>
          <TouchableOpacity onPress={handleCategoryPressed}>
            <Text style={{ padding: 20, fontSize: 28, color: color.gray }}>
              {getCategoryIcon(selectedCategory)}
              {getCategoryMandarin(selectedCategory)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 35, flex: 1 }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: color.secondary }}>名稱</Text>
          <EditableText
            initialValue={name}
            placeholder="無"
            onTextChanged={name => setName(name)}
            fontSize={28}
            style={{ paddingLeft: 20, paddingTop: 20 }}
          />
        </View>
        {mode === "edit" && (
          <Button bordered danger block style={{ marginHorizontal: 40, marginTop: 20 }} onPress={handleDeletePressed}>
            <Text style={{ color: color.danger }}>刪除</Text>
          </Button>
        )}
        <Button
          block
          style={{ margin: 40, marginTop: 20, backgroundColor: color.primary }}
          onPress={handleSubmitPressed}
        >
          <Text style={{ color: color.white }}>{mode === "create" ? "新增" : "完成編輯"}</Text>
        </Button>
      </Content>
    </SafeAreaView>
  );
};

export default connect(
  (state: AppState, props: Props) => ({
    spendingLabel:
      props.navigation.getParam("mode") === "edit"
        ? spendingLabelSelectors.getSpendingLabelById(state, props.navigation.getParam("labelId"))
        : undefined,
    isSpendingLabelUsed:
      props.navigation.getParam("mode") === "edit"
        ? consumptionSelectors.isSpendingLabelUsed(state, props.navigation.getParam("labelId"))
        : undefined,
  }),
  {
    createSpendingLabel: spendingLabelActionCreators.createSpendingLabel,
    updateSpendingLabel: spendingLabelActionCreators.updateSpendingLabel,
    deleteSpendingLabel: spendingLabelActionCreators.deleteSpendingLabel,
  }
)(LabelManager);
