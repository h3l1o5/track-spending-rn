import React, { Component, Fragment } from "react";
import { SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Content, Text, View, Button, Icon } from "native-base";
import { connect } from "react-redux";
import Permissions from "react-native-permissions";
import _ from "lodash";

import NumberPad from "../../components/NumberPad";
import color from "../../theme/color";
import { AppState, SpendingLabel } from "../../typings";
import { getCategoryMandarin, getCategoryIcon } from "../../util";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";

interface Props {
  spendingLabels: SpendingLabel[] | null;
}
interface State {
  spending: number;
  selectedSpendingLabel?: SpendingLabel | null;
  position: Position | null;
}

export class AddSpending extends Component<Props, State> {
  public state: State = {
    spending: 0,
    selectedSpendingLabel: null,
    position: null,
  };

  public async componentDidMount() {
    const locationPermission = await Permissions.check("location");

    if (locationPermission !== "authorized") {
      Permissions.request("location");
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ position });
      });
    }
  }

  public componentDidUpdate() {
    if (this.props.spendingLabels && !this.state.selectedSpendingLabel) {
      this.setState({ selectedSpendingLabel: this.props.spendingLabels[0] });
    }
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
    const spendingLabels = this.props.spendingLabels || [];

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {this.state.position && (
              <Fragment>
                <Text>{this.state.position.coords.latitude}</Text>
                <Text>{this.state.position.coords.longitude}</Text>
              </Fragment>
            )}
          </View>
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
                  data={_.map(spendingLabels, spendingLabel => ({
                    ...spendingLabel,
                    categoryMandarin: getCategoryMandarin(spendingLabel.category),
                    categoryIcon: getCategoryIcon(spendingLabel.category),
                  }))}
                  keyExtractor={() => Math.random().toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.setState({ selectedSpendingLabel: item })}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text>{item.categoryIcon}</Text>
                        <Text
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          style={{
                            flex: 1,
                            fontSize: 18,
                            marginVertical: 5,
                            marginLeft: 2,
                            paddingVertical: 5,
                            fontWeight:
                              item.name === _.get(this.state, "selectedSpendingLabel.name") ? "bold" : "normal",
                            color:
                              item.name === _.get(this.state, "selectedSpendingLabel.name")
                                ? color.secondary
                                : color.dark,
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

export default connect((state: AppState) => ({
  spendingLabels: spendingLabelSelectors.getSpendingLabels(state),
}))(AddSpending);
