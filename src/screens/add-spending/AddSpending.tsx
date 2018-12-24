import React, { Component } from "react";
import { SafeAreaView, Alert } from "react-native";
import { Content, Toast } from "native-base";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import moment from "moment";
import _ from "lodash";

import { AppState, SpendingLabel, ConsumptionCreateProperties } from "../../typings";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import InfoPanel from "./InfoPanel";
import ControlPanel from "./ControlPanel";
import { settingSelectors } from "../../redux/reducers/setting.reducer";
import { consumptionActionCreators } from "../../redux/reducers/consumption.reducer";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  labels: SpendingLabel[];
  isAutoLocateEnabled: boolean;
  createConsumption: (consumption: ConsumptionCreateProperties) => void;
}
interface State {
  spending: number;
  selectedLabelId: string;
  time: number;
  location: { latitude: number; longitude: number } | null;
  comment: string | null;
}

export class AddSpending extends Component<Props, State> {
  public state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      spending: 0,
      selectedLabelId: _.get(props.labels[0], "id", ""),
      time: moment()
        .startOf("day")
        .add("12", "hours")
        .valueOf(),
      location: null,
      comment: null,
    };
  }

  public handleLabelSelected = (labelId: string) => {
    this.setState({ selectedLabelId: labelId });
  };

  public handleSpendingChanged = (spending: number) => {
    this.setState({ spending });
  };

  public handleTimeChanged = (time: number) => {
    this.setState({ time });
  };

  public handleLocationChanged = (location: { latitude: number; longitude: number } | null) => {
    this.setState({ location });
  };

  public handleCommentChanged = (comment: string) => {
    this.setState({ comment });
  };

  public handleSubmit = () => {
    if (this.props.labels.length === 0 || this.state.selectedLabelId === "") {
      return Alert.alert("無法設定消費項目，先去新增一個標籤吧！", "", [{ text: "好" }]);
    }

    const newConsumption = this.state;
    if (!this.state.location && this.props.isAutoLocateEnabled) {
      navigator.geolocation.getCurrentPosition(currentLocation => {
        newConsumption.location = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };

        this.props.createConsumption(newConsumption);
        this.setState({ spending: 0, comment: null });
        Toast.show({
          type: "success",
          text: "新增消費紀錄成功✌️",
          buttonText: "好",
          duration: 5000,
          position: "bottom",
        });
      });
    } else {
      this.props.createConsumption(newConsumption);
      this.setState({ spending: 0, comment: null });
      Toast.show({
        type: "success",
        text: "新增消費紀錄成功✌️",
        buttonText: "好",
        duration: 5000,
        position: "bottom",
      });
    }
  };

  public render() {
    const { spending, selectedLabelId, time, location, comment } = this.state;
    const labels = this.props.labels || [];

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
          <InfoPanel
            navigation={this.props.navigation}
            selectedLabel={_.find(labels, label => label.id === selectedLabelId)}
            time={time}
            onTimeChanged={this.handleTimeChanged}
            location={location}
            onLocationChanged={this.handleLocationChanged}
            comment={comment}
            onCommentChanged={this.handleCommentChanged}
            isAutoLocateEnabled={this.props.isAutoLocateEnabled}
            style={{ padding: 15 }}
          />
          <ControlPanel
            spending={spending}
            labels={labels}
            selectedLabelId={selectedLabelId}
            onLabelSelected={this.handleLabelSelected}
            onSpendingChanged={this.handleSpendingChanged}
            onSubmit={this.handleSubmit}
            navigation={this.props.navigation}
            style={{ paddingHorizontal: 10 }}
          />
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: AppState) => ({
    isAutoLocateEnabled: settingSelectors.isAutoLocateEnabled(state),
    labels: spendingLabelSelectors.getSpendingLabels(state),
  }),
  {
    createConsumption: consumptionActionCreators.createConsumption,
  }
)(AddSpending);
