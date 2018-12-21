import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Card, CardItem, Text, View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";
import _ from "lodash";

import { Consumption, AppState, SpendingLabel } from "../../typings";
import color from "../../theme/color";

const styles = StyleSheet.create({
  icon: { fontSize: 20, marginRight: 5, color: color.dark },
});

interface Props {
  consumption: Consumption;
  spendingLabelsById: { [id: string]: SpendingLabel };
}
export class ConsumptionCard extends Component<Props> {
  public handleLabelPressed = () => {
    console.log("label");
  };

  public handleSpendingPressed = () => {
    console.log("spending");
  };

  public handleLocationPressed = () => {
    console.log("location");
  };

  public handleCommentPressed = () => {
    console.log("comment");
  };

  public render() {
    const { spendingLabelsById, consumption } = this.props;

    return (
      <Card>
        <CardItem bordered header style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ flex: 1 }} onLongPress={this.handleLabelPressed}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon type="Feather" name="tag" style={styles.icon} />
                <Text numberOfLines={1} adjustsFontSizeToFit={true}>
                  {spendingLabelsById ? spendingLabelsById[consumption.selectedLabelId].name : ""}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onLongPress={this.handleSpendingPressed}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon type="FontAwesome" name="dollar" style={styles.icon} />
                <Text numberOfLines={1} ellipsizeMode="middle" adjustsFontSizeToFit={true}>
                  {consumption.spending}
                </Text>
              </View>
            </TouchableOpacity>
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
                onLongPress={this.handleLocationPressed}
                provider={PROVIDER_GOOGLE}
                style={{ height: "100%", width: "100%" }}
                initialRegion={{ ...consumption.location, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
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
        <TouchableOpacity onLongPress={this.handleCommentPressed}>
          <CardItem footer>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Icon type="Feather" name="message-square" style={styles.icon} />
              <Text numberOfLines={1} ellipsizeMode="middle" adjustsFontSizeToFit={true}>
                {consumption.comment || "無備註"}
              </Text>
            </View>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default connect((state: AppState) => ({
  spendingLabelsById: state.spendingLabel.byId,
}))(ConsumptionCard);
