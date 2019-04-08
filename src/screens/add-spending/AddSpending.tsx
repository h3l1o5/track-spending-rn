import React, { useState } from "react";
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
import { getCurrentLocation } from "../../utils";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  labels: SpendingLabel[];
  isAutoLocateEnabled: boolean;
  createConsumption: (consumption: ConsumptionCreateProperties) => void;
}

const AddSpending = (props: Props) => {
  const [spending, setSpending] = useState(0);
  const [selectedLabelId, setSelectedLabelId] = useState(_.get(props.labels[0], "id", ""));
  const [time, setTime] = useState(
    moment()
      .startOf("day")
      .add("12", "hours")
      .valueOf()
  );
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [comment, setComment] = useState<string | null>(null);

  const handleLabelSelected = (labelId: string) => {
    setSelectedLabelId(labelId);
  };

  const handleSpendingChanged = (spending: number) => {
    setSpending(spending);
  };

  const handleTimeChanged = (time: number) => {
    setTime(time);
  };

  const handleLocationChanged = (location: { latitude: number; longitude: number } | null) => {
    setLocation(location);
  };

  const handleCommentChanged = (comment: string) => {
    setComment(comment);
  };

  const handleSubmit = async () => {
    if (props.labels.length === 0 || selectedLabelId === "") {
      return Alert.alert("無法設定消費項目，先去新增一個標籤吧！", "", [{ text: "好" }]);
    }

    const newConsumption = {
      spending,
      selectedLabelId,
      time,
      location: !location && props.isAutoLocateEnabled ? await getCurrentLocation() : location,
      comment,
    };

    props.createConsumption(newConsumption);

    setSpending(0);
    setComment(null);
    Toast.show({
      type: "success",
      text: "新增消費紀錄成功✌️",
      buttonText: "好",
      duration: 5000,
      position: "bottom",
    });
  };

  const labels = props.labels || [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
        <InfoPanel
          navigation={props.navigation}
          selectedLabel={_.find(labels, label => label.id === selectedLabelId)}
          time={time}
          onTimeChanged={handleTimeChanged}
          location={location}
          onLocationChanged={handleLocationChanged}
          comment={comment}
          onCommentChanged={handleCommentChanged}
          isAutoLocateEnabled={props.isAutoLocateEnabled}
          style={{ padding: 15 }}
        />
        <ControlPanel
          spending={spending}
          labels={labels}
          selectedLabelId={selectedLabelId}
          onLabelSelected={handleLabelSelected}
          onSpendingChanged={handleSpendingChanged}
          onSubmit={handleSubmit}
          navigation={props.navigation}
          style={{ paddingHorizontal: 10 }}
        />
      </Content>
    </SafeAreaView>
  );
};

export default connect(
  (state: AppState) => ({
    isAutoLocateEnabled: settingSelectors.isAutoLocateEnabled(state),
    labels: spendingLabelSelectors.getSpendingLabels(state),
  }),
  {
    createConsumption: consumptionActionCreators.createConsumption,
  }
)(AddSpending);
