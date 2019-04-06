import React from "react";
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

const ControlPanel = (props: Props) => {
  const handleNumberPadPressed = (value: number | string) => {
    if (_.isNumber(value) && props.spending <= 10e10) {
      props.onSpendingChanged(props.spending * 10 + value);
    }

    if (value === "backspace") {
      props.onSpendingChanged(_.floor(props.spending / 10));
    }
  };

  return (
    <View style={props.style}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 5,
          borderColor: color.primary,
          borderRadius: 20,
        }}
      >
        <Text numberOfLines={1} style={{ flex: 4, fontSize: 24, padding: 10, paddingLeft: 15 }}>
          {props.spending}
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
          onPress={props.onSubmit}
        >
          <Icon type="AntDesign" name="check" style={{ color: color.light }} />
        </Button>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2, borderRightWidth: 4, borderRightColor: color.primary, marginVertical: 15 }}>
          {props.labels.length === 0 ? (
            <View style={{ margin: 10 }}>
              <Text style={{ marginBottom: 20, textAlign: "center" }}>目前沒有任何標籤，新增一個吧！</Text>
              <Button
                style={{ backgroundColor: "#5893d4" }}
                block
                onPress={() => props.navigation.navigate("LabelManager", { mode: "create" })}
              >
                <Text>新增</Text>
              </Button>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, marginHorizontal: 7 }}
              data={_.map(props.labels, label => ({
                ...label,
                categoryMandarin: getCategoryMandarin(label.category),
                categoryIcon: getCategoryIcon(label.category),
              }))}
              keyExtractor={() => Math.random().toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => props.onLabelSelected(item.id || "")}>
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
                        fontWeight: item.id === props.selectedLabelId ? "bold" : "normal",
                        color: item.id === props.selectedLabelId ? color.secondary : color.dark,
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
          <NumberPad onButtonPressed={handleNumberPadPressed} />
        </View>
      </View>
    </View>
  );
};

export default ControlPanel;
