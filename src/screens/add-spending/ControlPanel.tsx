import React, { Component } from "react";
import { FlatList, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text, View, Button, Icon } from "native-base";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import color from "../../theme/color";
import { getCategoryMandarin, getCategoryIcon } from "../../utils";
import NumberPad from "../../components/NumberPad";
import { SpendingLabel } from "../../typings";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  spending: number;
  labels: SpendingLabel[];
  selectedLabelId?: string;
  onLabelSelected: (labelId: string) => void;
  onSpendingChanged: (spending: number) => void;
  onSubmit: () => void;
  style?: StyleProp<ViewStyle>;
}

export class ControlPanel extends Component<Props> {
  public handleNumberPadPressed = (value: number | string) => {
    if (_.isNumber(value) && this.props.spending <= 10e10) {
      this.props.onSpendingChanged(this.props.spending * 10 + value);
    }

    if (value === "backspace") {
      this.props.onSpendingChanged(_.floor(this.props.spending / 10));
    }
  };

  public render() {
    const { spending, labels, selectedLabelId, onLabelSelected, onSubmit, style } = this.props;

    return (
      <View style={style}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 5,
            borderColor: color.primary,
            borderRadius: 20,
          }}
        >
          <Text numberOfLines={1} style={{ flex: 4, fontSize: 24, padding: 10, paddingLeft: 15 }}>
            {spending}
          </Text>
          <Button
            activeOpacity={1}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 0,
              backgroundColor: color.primary,
            }}
            onPress={onSubmit}
          >
            <Icon type="Feather" name="check" style={{ color: color.light }} />
          </Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, borderRightWidth: 4, borderRightColor: color.primary, marginVertical: 15 }}>
            {labels.length === 0 ? (
              <View style={{ margin: 10 }}>
                <Text style={{ marginBottom: 20, textAlign: "center" }}>目前沒有任何標籤，新增一個吧！</Text>
                <Button
                  style={{ backgroundColor: "#5893d4" }}
                  block
                  onPress={() => this.props.navigation.navigate("LabelManager", { mode: "create" })}
                >
                  <Text>新增</Text>
                </Button>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginHorizontal: 7 }}
                data={_.map(labels, label => ({
                  ...label,
                  categoryMandarin: getCategoryMandarin(label.category),
                  categoryIcon: getCategoryIcon(label.category),
                }))}
                keyExtractor={() => Math.random().toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onLabelSelected(item.id || "")}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text>{item.categoryIcon}</Text>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={{
                          flex: 1,
                          fontSize: 18,
                          marginVertical: 5,
                          marginLeft: 2,
                          paddingVertical: 5,
                          fontWeight: item.id === selectedLabelId ? "bold" : "normal",
                          color: item.id === selectedLabelId ? color.secondary : color.dark,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
          <View style={{ flex: 3, padding: 10, paddingRight: 0 }}>
            <NumberPad onButtonPressed={this.handleNumberPadPressed} />
          </View>
        </View>
      </View>
    );
  }
}

export default ControlPanel;
