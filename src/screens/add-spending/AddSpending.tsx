import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Content } from "native-base";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import { AppState, SpendingLabel } from "../../typings";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import InfoPanel from "./InfoPanel";
import ControlPanel from "./ControlPanel";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  labels: SpendingLabel[] | null;
}
interface State {
  spending: number;
  selectedLabelId?: string;
  position?: { latitude: number; longitude: number };
}

export class AddSpending extends Component<Props, State> {
  public state: State = {
    spending: 0,
    selectedLabelId: undefined,
    position: undefined,
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

  public handlePositionChanged = (position: { latitude: number; longitude: number }) => {
    this.setState({ position });
  };

  public render() {
    const { spending, selectedLabelId, position } = this.state;
    const labels = this.props.labels || [];

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
          <InfoPanel
            navigation={this.props.navigation}
            selectedLabel={_.find(labels, label => label.id === selectedLabelId)}
            position={position}
            onPositionChanged={position => this.setState({ position })}
            style={{ padding: 15 }}
          />
          <ControlPanel
            spending={spending}
            labels={labels}
            selectedLabelId={selectedLabelId}
            onLabelSelected={this.handleLabelSelected}
            onSpendingChanged={this.handleSpendingChanged}
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
