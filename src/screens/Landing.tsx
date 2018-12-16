import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, AppState } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Permissions from "react-native-permissions";
import _ from "lodash";

import { spendingLabelActionCreators, spendingLabelSelectors } from "../redux/reducers/spending-label.reducer";
import { permissionActionCreators } from "../redux/reducers/permission.reducer";
import { PermissionStatus, AppState as _AppState, SpendingLabel } from "../typings";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  modifyLocationPermission: (status: PermissionStatus) => void;
  createDefaultSpendingLabels: () => void;
  spendingLabels: SpendingLabel[];
}
interface State {
  isSpendingLabelsReady: boolean;
  isPermissionsCheck: boolean;
}

export class Landing extends Component<Props> {
  public state: State = {
    isSpendingLabelsReady: false,
    isPermissionsCheck: false,
  };

  private preparePermission = async () => {
    const handleAppStateChange = async (nextAppState: "active" | "background" | "inactive") => {
      console.log("state change: ", nextAppState);
      if (nextAppState === "active") {
        try {
          const locationPermission = await Permissions.check("location");
          this.props.modifyLocationPermission(locationPermission);
        } catch (error) {
          console.error(error);
        }
      }
    };

    try {
      // Run permission checker whenever App is back from background mode later.
      AppState.addEventListener("change", handleAppStateChange);
      // First time check
      const locationPermission = await Permissions.check("location");
      this.props.modifyLocationPermission(locationPermission);
      this.setState({ isPermissionsCheck: true });
    } catch (error) {
      console.error(error);
    }
  };

  private prepareSpendingLabels = () => {
    if (this.props.spendingLabels.length === 0) {
      this.props.createDefaultSpendingLabels();
    }
    this.setState({ isSpendingLabelsReady: true });
  };

  public async componentDidMount() {
    this.preparePermission();
    this.prepareSpendingLabels();
  }

  public async componentDidUpdate() {
    if (this.state.isSpendingLabelsReady && this.state.isPermissionsCheck) {
      this.props.navigation.navigate("Main");
    }
  }

  public render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Loading ... </Text>
      </View>
    );
  }
}

export default connect(
  (state: _AppState) => ({
    spendingLabels: spendingLabelSelectors.getSpendingLabels(state),
  }),
  {
    modifyLocationPermission: permissionActionCreators.modifyLocationPermission,
    createDefaultSpendingLabels: spendingLabelActionCreators.createDefaultSpendingLabels,
  }
)(Landing);
