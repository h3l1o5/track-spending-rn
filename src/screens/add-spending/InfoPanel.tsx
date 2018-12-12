import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Content, Text, View, Button, Icon } from "native-base";
import color from "../../theme/color";

const styles = StyleSheet.create({
  itemContainer: { flex: 1, justifyContent: "space-around" },
  title: { fontSize: 24, fontWeight: "bold", color: color.primary },
  content: { fontSize: 18, color: color.dark },
});

export class InfoPanel extends Component {
  public render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", padding: 15 }}>
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
            <Text style={styles.content}>👕衣</Text>
          </View>
          <View style={[styles.itemContainer, { alignItems: "center" }]}>
            <Text style={styles.title}>標籤</Text>
            <Text style={styles.content}>衣服</Text>
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
