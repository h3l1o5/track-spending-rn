import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text, View } from "native-base";
import color from "../../theme/color";
import { SpendingLabel } from "../../typings";
import _ from "lodash";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";

const styles = StyleSheet.create({
  itemContainer: { flex: 1, justifyContent: "space-around" },
  title: { fontSize: 24, fontWeight: "bold", color: color.primary },
  content: { fontSize: 18, color: color.dark },
});

interface Props {
  selectedLabel?: SpendingLabel;
  style?: StyleProp<ViewStyle>;
}

export class InfoPanel extends Component<Props> {
  public render() {
    const { selectedLabel, style } = this.props;

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
            <TouchableOpacity>
              <Text style={[styles.content, { paddingLeft: 10, color: color.gray }]}>經度:120.243 | 緯度: 21.335</Text>
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
