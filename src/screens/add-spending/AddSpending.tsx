import React, { Component } from "react";
import { Content, Text } from "native-base";
import { SafeAreaView } from "react-native";

export class AddSpending extends Component {
  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content>
          <Text>Add Spending</Text>
        </Content>
      </SafeAreaView>
    );
  }
}

export default AddSpending;
