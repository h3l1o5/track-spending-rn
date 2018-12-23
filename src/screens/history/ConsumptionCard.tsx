import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Card, CardItem, Text, View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import { Consumption, AppState, SpendingLabel, ConsumptionUpdateProperties } from "../../typings";
import color from "../../theme/color";
import { consumptionActionCreators } from "../../redux/reducers/consumption.reducer";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import EditableText from "../../components/EditableText";

const styles = StyleSheet.create({
  icon: { fontSize: 20, marginRight: 10, color: color.dark },
});

interface Props {
  navigation: NavigationScreenProp<any, any>;
  consumption: Consumption;
  spendingLabels: SpendingLabel[];
  spendingLabelsById: { [id: string]: SpendingLabel };
  updateConsumption: (id: string, properties: ConsumptionUpdateProperties) => void;
}
export class ConsumptionCard extends Component<Props> {
  public handleLabelPressed = () => {
    this.props.navigation.navigate("EditLabel", {
      consumption: this.props.consumption,
      spendingLabels: this.props.spendingLabels,
      onSelect: (selectedLabelId: string) =>
        this.props.updateConsumption(this.props.consumption.id, { selectedLabelId }),
    });
  };

  public handleSpendingPressed = () => {
    this.props.navigation.navigate("EditSpending", {
      consumption: this.props.consumption,
      onSubmit: (spending: number) => this.props.updateConsumption(this.props.consumption.id, { spending }),
    });
  };

  public handleLocationPressed = () => {
    this.props.navigation.navigate("ChooseLocation", {
      initialLocation: this.props.consumption.location,
      onLocationChanged: (location: { latitude: number; longitude: number }) =>
        this.props.updateConsumption(this.props.consumption.id, { location }),
    });
  };

  public handleCommentChanged = (comment: string) => {
    this.props.updateConsumption(this.props.consumption.id, { comment });
  };

  public render() {
    const { spendingLabelsById, consumption } = this.props;

    return (
      <Card>
        <CardItem bordered header style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Icon type="Feather" name="tag" style={styles.icon} />
              <TouchableOpacity onLongPress={this.handleLabelPressed} style={{ flex: 1 }}>
                <Text numberOfLines={1} adjustsFontSizeToFit={true}>
                  {spendingLabelsById ? spendingLabelsById[consumption.selectedLabelId].name : ""}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Icon type="FontAwesome" name="dollar" style={styles.icon} />
              <TouchableOpacity onLongPress={this.handleSpendingPressed} style={{ flex: 1 }}>
                <Text numberOfLines={1} ellipsizeMode="middle" adjustsFontSizeToFit={true}>
                  {consumption.spending}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardItem>
        <TouchableOpacity onLongPress={this.handleLocationPressed}>
          <CardItem
            bordered
            style={{
              height: 200,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {consumption.location ? (
              <MapView
                region={{ ...consumption.location, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
                onLongPress={this.handleLocationPressed}
                provider={PROVIDER_GOOGLE}
                style={{ height: "100%", width: "100%" }}
                rotateEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
                toolbarEnabled={false}
              >
                <Marker coordinate={consumption.location} />
              </MapView>
            ) : (
              <Text>沒有位置資訊</Text>
            )}
          </CardItem>
        </TouchableOpacity>
        <CardItem footer>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Icon type="Feather" name="message-square" style={styles.icon} />
            <EditableText
              longPressMode
              initialValue={consumption.comment}
              placeholder="無備註"
              onTextChanged={this.handleCommentChanged}
              textColor={color.dark}
              style={{ flex: 1 }}
            />
          </View>
        </CardItem>
      </Card>
    );
  }
}

export default connect(
  (state: AppState) => ({
    spendingLabels: spendingLabelSelectors.getSpendingLabels(state),
    spendingLabelsById: state.spendingLabel.byId,
  }),
  {
    updateConsumption: consumptionActionCreators.updateConsumption,
  }
)(ConsumptionCard);
