import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Content } from "native-base";
import { connect } from "react-redux";
import _ from "lodash";

import { AppState, SpendingLabel } from "../../typings";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import InfoPanel from "./InfoPanel";
import ControlPanel from "./ControlPanel";

interface Props {
  labels: SpendingLabel[] | null;
}
interface State {
  spending: number;
  selectedLabelId?: string;
}

export class AddSpending extends Component<Props, State> {
  public state: State = {
    spending: 0,
    selectedLabelId: undefined,
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

  public render() {
    const {spending, selectedLabelId} = this.state;
    const labels = this.props.labels || [];

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
          <InfoPanel
            selectedLabel={_.find(labels, label => label.id === selectedLabelId)}
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
