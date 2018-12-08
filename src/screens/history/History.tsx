import React, { Component } from "react";
import { Content, Text } from "native-base";
import { SafeAreaView } from "react-native";

export class History extends Component {
  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content>
          <Text>History</Text>
        </Content>
      </SafeAreaView>
    );
  }
}

export default History;
