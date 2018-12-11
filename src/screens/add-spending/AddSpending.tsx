import React, { Component } from "react";
import { SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Content, Text, View, Button, Icon } from "native-base";
import firebase from "react-native-firebase";
import _ from "lodash";

import NumberPad from "../../components/NumberPad";
import color from "../../theme/color";
import { DEFAULT_LABELS, getCategoryMandarin, getCategoryIcon } from "../../util";

export class AddSpending extends Component {
  public state = {
    spending: 0,
  };

  public async componentDidMount() {
    const users = await firebase
      .firestore()
      .collection("User")
      .get();

    users.forEach(user => console.log(user.data()));
  }

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
          <View style={{ marginHorizontal: 10, marginVertical: 0 }}>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 5,
                borderColor: color.primary,
                borderRadius: 20,
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
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 2, borderRightWidth: 4, borderRightColor: color.primary }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1, marginBottom: 10, marginHorizontal: 7, paddingTop: 10 }}
                  data={_.map(DEFAULT_LABELS, defaultLabel => ({
                    ...defaultLabel,
                    category: getCategoryMandarin(defaultLabel.category),
                    categoryIcon: getCategoryIcon(defaultLabel.category),
                  }))}
                  keyExtractor={() => Math.random().toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text>{item.categoryIcon}</Text>
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={{
                            flex: 1,
                            fontSize: Math.sqrt(16 * 16),
                            marginVertical: 5,
                            marginLeft: 2,
                            paddingVertical: 5,
                            color: item.name === "瓦斯費" ? color.secondary : color.dark,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={{ flex: 3, padding: 10, paddingRight: 0 }}>
                <NumberPad onButtonPressed={this.handleNumberPadPressed} />
              </View>
            </View>
          </View>
        </Content>
      </SafeAreaView>
    );
  }
}

export default AddSpending;
