import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Content, Button, Icon } from "native-base";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import NumberPad from "../../components/NumberPad";
import color from "../../theme/color";

interface State {
  spending: number;
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
}
export class EditSpending extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      spending: props.navigation.getParam("consumption").spending,
    };
  }

  public handleNumberPadPressed = (value: number | string) => {
    if (_.isNumber(value) && this.state.spending <= 10e10) {
      this.setState({ spending: this.state.spending * 10 + value });
    }

    if (value === "backspace") {
      this.setState({ spending: _.floor(this.state.spending / 10) });
    }
  };

  public handleSubmit = () => {
    const onSubmit: (spending: number) => void = this.props.navigation.getParam("onSubmit");

    onSubmit(this.state.spending);
    this.props.navigation.goBack();
  };

  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 5,
              borderColor: color.primary,
              borderRadius: 20,
              marginBottom: 10,
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
              onPress={this.handleSubmit}
            >
              <Icon type="AntDesign" name="check" style={{ color: color.light }} />
            </Button>
          </View>
          <NumberPad onButtonPressed={this.handleNumberPadPressed} />
        </Content>
      </SafeAreaView>
    );
  }
}

export default EditSpending;
