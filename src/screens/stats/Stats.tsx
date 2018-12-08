import React, { Component } from "react";
import { Content, Text } from "native-base";
import { SafeAreaView } from "react-native";

export class Stats extends Component {
  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content>
          <Text>Stats</Text>
        </Content>
      </SafeAreaView>
    );
  }
}

export default Stats;
