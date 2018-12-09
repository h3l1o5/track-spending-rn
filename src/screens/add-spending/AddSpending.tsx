import React, { Component } from "react";
import { Content, Text, View, Button, Icon } from "native-base";
import { SafeAreaView } from "react-native";
import _ from "lodash";

import NumberPad from "../../components/NumberPad";
import color from "../../theme/color";

export class AddSpending extends Component {
  public state = {
    spending: 0,
  };

  public handleNumberPadPressed = (value: number | string) => {
    if (_.isNumber(value) && this.state.spending <= 10e10) {
      this.setState({ spending: this.state.spending * 10 + value });
    }

    if (value === "backspace") {
      return this.setState({ spending: _.floor(this.state.spending / 10) });
    }
  };

  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 5,
                borderColor: color.primary,
                borderRadius: 20,
                marginBottom: 5,
              }}
            >
              <Text numberOfLines={1} style={{ flex: 4, fontSize: 24, padding: 10, paddingLeft: 15 }}>
                {this.state.spending}
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
              >
                <Icon type="Feather" name="check" style={{ color: color.light }} />
              </Button>
            </View>
            <NumberPad onButtonPressed={this.handleNumberPadPressed} />
          </View>
        </Content>
      </SafeAreaView>
    );
  }
}

export default AddSpending;
