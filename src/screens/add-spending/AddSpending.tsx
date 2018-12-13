import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Content, Icon, View, Toast } from "native-base";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { Region } from "react-native-maps";
import _ from "lodash";

import { AppState, SpendingLabel } from "../../typings";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import InfoPanel from "./InfoPanel";
import ControlPanel from "./ControlPanel";
import firebase, { firestore } from "react-native-firebase";
import color from "../../theme/color";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  labels: SpendingLabel[] | null;
}
interface State {
  spending: number;
  selectedLabelId?: string;
  region?: Region;
  comment?: string;
}

export class AddSpending extends Component<Props, State> {
  public state: State = {
    spending: 0,
    selectedLabelId: undefined,
    region: undefined,
    comment: undefined,
  };

  public componentDidUpdate() {
    if (this.props.labels && !this.state.selectedLabelId) {
      this.setState({ selectedLabelId: this.props.labels[0].id });
    }
  }

  public handleLabelSelected = (labelId: string) => {
    this.setState({ selectedLabelId: labelId });
  };

  public handleSpendingChanged = (spending: number) => {
    this.setState({ spending });
  };

  public handleRegionChanged = (region: Region) => {
    this.setState({ region });
  };

  public handleCommentChanged = (comment: string) => {
    this.setState({ comment });
  };

  public handleSubmit = async () => {
    try {
      const now = new Date();
      await firestore()
        .collection(`user/${_.get(firebase.auth(), "currentUser.uid")}/consumption`)
        .add({ ...this.state, time: now, createdAt: now });
      this.setState({ spending: 0, selectedLabelId: undefined, region: undefined, comment: undefined });
      Toast.show({
        type: "success",
        text: "新增消費紀錄成功✌️",
        buttonText: "好",
        duration: 5000,
        position: "bottom",
      });
    } catch (error) {
      console.error(error);
    }
  };

  public render() {
    const { spending, selectedLabelId, region, comment } = this.state;
    const labels = this.props.labels || [];

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
          <InfoPanel
            navigation={this.props.navigation}
            selectedLabel={_.find(labels, label => label.id === selectedLabelId)}
            region={region}
            onRegionChanged={this.handleRegionChanged}
            comment={comment}
            onCommentChanged={this.handleCommentChanged}
            style={{ padding: 15 }}
          />
          <ControlPanel
            spending={spending}
            labels={labels}
            selectedLabelId={selectedLabelId}
            onLabelSelected={this.handleLabelSelected}
            onSpendingChanged={this.handleSpendingChanged}
            onSubmit={this.handleSubmit}
            style={{ paddingHorizontal: 10 }}
          />
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect((state: AppState) => ({
  labels: spendingLabelSelectors.getSpendingLabels(state),
}))(AddSpending);
