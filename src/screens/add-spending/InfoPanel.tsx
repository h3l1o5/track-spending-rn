import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text, View } from "native-base";
import { NavigationScreenProp } from "react-navigation";
import { Region } from "react-native-maps";
import _ from "lodash";

import color from "../../theme/color";
import { SpendingLabel } from "../../typings";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";

const styles = StyleSheet.create({
  itemContainer: { flex: 1, justifyContent: "space-around" },
  title: { fontSize: 24, fontWeight: "bold", color: color.primary },
  content: { fontSize: 18, color: color.dark },
});

interface Props {
  navigation: NavigationScreenProp<any, any>;
  selectedLabel?: SpendingLabel;
  position?: { latitude: number; longitude: number };
  onPositionChanged: (position: { latitude: number; longitude: number }) => void;
  style?: StyleProp<ViewStyle>;
}

export class InfoPanel extends Component<Props> {
  public render() {
    const { selectedLabel, position, onPositionChanged, style } = this.props;

    const labelCategory = selectedLabel
      ? `${getCategoryIcon(selectedLabel.category)} ${getCategoryMandarin(selectedLabel.category)}`
      : "";
    const labelName = selectedLabel ? selectedLabel.name : "";

    return (
      <View style={[{ flex: 1, flexDirection: "column" }, style]}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            paddingBottom: 10,
            borderBottomColor: color.secondary,
            borderBottomWidth: 2,
          }}
        >
          <View style={[styles.itemContainer, { alignItems: "center" }]}>
            <Text style={styles.title}>類型</Text>
            <Text style={styles.content}>{labelCategory}</Text>
          </View>
          <View style={[styles.itemContainer, { alignItems: "center" }]}>
            <Text style={styles.title}>標籤</Text>
            <Text style={styles.content}>{labelName}</Text>
          </View>
        </View>
        <View style={{ flex: 7, paddingTop: 20 }}>
          <View style={styles.itemContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.title}>地點</Text>
              <TouchableOpacity>
                <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#5893d4" }}>(自動位置設定: 關閉)</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Map", {
                  initialPosition: position,
                  onPositionChanged,
                })
              }
            >
              <Text style={[styles.content, { paddingLeft: 10, color: color.gray }]}>
                {position ? `經度: ${position.longitude.toFixed(3)} | 緯度: ${position.latitude.toFixed(3)}` : "未設定"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>備註</Text>
            <TouchableOpacity>
              <Text style={[styles.content, { paddingLeft: 10, color: color.gray }]}>無</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default InfoPanel;
