import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Icon, Card, CardItem, Text, View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";
import { NavigationScreenProp, withNavigation } from "react-navigation";
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
  deleteConsumption: (id: string) => void;
}

const ConsumptionCard = (props: Props) => {
  const handleLabelPressed = () => {
    props.navigation.navigate("EditLabel", {
      consumption: props.consumption,
      spendingLabels: props.spendingLabels,
      onSelect: (selectedLabelId: string) => props.updateConsumption(props.consumption.id, { selectedLabelId }),
    });
  };

  const handleSpendingPressed = () => {
    props.navigation.navigate("EditSpending", {
      consumption: props.consumption,
      onSubmit: (spending: number) => props.updateConsumption(props.consumption.id, { spending }),
    });
  };

  const handleLocationPressed = () => {
    props.navigation.navigate("ChooseLocation", {
      initialLocation: props.consumption.location,
      onLocationChanged: (location: { latitude: number; longitude: number }) =>
        props.updateConsumption(props.consumption.id, { location }),
    });
  };

  const handleCommentChanged = (comment: string) => {
    props.updateConsumption(props.consumption.id, { comment });
  };

  const handleDeletePressed = () => {
    Alert.alert("", "確定要刪除這筆消費紀錄嗎？", [
      { text: "取消", style: "cancel" },
      { text: "刪除", style: "destructive", onPress: () => props.deleteConsumption(props.consumption.id) },
    ]);
  };

  return (
    <Card>
      <CardItem header style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Icon type="AntDesign" name="tag" style={styles.icon} />
            <TouchableOpacity onLongPress={handleLabelPressed} style={{ flex: 1 }}>
              <Text numberOfLines={1} adjustsFontSizeToFit={true}>
                {props.spendingLabelsById ? props.spendingLabelsById[props.consumption.selectedLabelId].name : ""}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Icon type="FontAwesome" name="dollar" style={styles.icon} />
            <TouchableOpacity onLongPress={handleSpendingPressed} style={{ flex: 1 }}>
              <Text numberOfLines={1} ellipsizeMode="middle" adjustsFontSizeToFit={true}>
                {props.consumption.spending}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CardItem>
      <CardItem header bordered>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Icon type="AntDesign" name="message1" style={styles.icon} />
          <EditableText
            longPressMode
            initialValue={props.consumption.comment}
            placeholder="無備註"
            onTextChanged={handleCommentChanged}
            textColor={color.dark}
            style={{ flex: 1 }}
          />
        </View>
      </CardItem>
      <TouchableOpacity onLongPress={handleLocationPressed}>
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
          {props.consumption.location ? (
            <MapView
              region={{ ...props.consumption.location, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
              onLongPress={handleLocationPressed}
              provider={PROVIDER_GOOGLE}
              style={{ height: "100%", width: "100%" }}
              rotateEnabled={false}
              scrollEnabled={false}
              pitchEnabled={false}
              toolbarEnabled={false}
            >
              <Marker coordinate={props.consumption.location} />
            </MapView>
          ) : (
            <Text>沒有位置資訊</Text>
          )}
        </CardItem>
      </TouchableOpacity>
      <CardItem
        footer
        button
        activeOpacity={1}
        style={{ backgroundColor: color.danger, justifyContent: "center" }}
        onPress={handleDeletePressed}
      >
        <Text style={{ color: color.white }}>刪除</Text>
      </CardItem>
    </Card>
  );
};

export default connect(
  (state: AppState) => ({
    spendingLabels: spendingLabelSelectors.getSpendingLabels(state),
    spendingLabelsById: state.spendingLabel.byId,
  }),
  {
    updateConsumption: consumptionActionCreators.updateConsumption,
    deleteConsumption: consumptionActionCreators.deleteConsumption,
  }
)(withNavigation(ConsumptionCard));
