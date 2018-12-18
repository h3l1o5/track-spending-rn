import React, { Component } from "react";
import { Content, Text } from "native-base";
import { SafeAreaView } from "react-native";

export class History extends Component {
  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 28 }}>👷🏽 施工中...</Text>
        </Content>
      </SafeAreaView>
    );
  }
}

export default History;
