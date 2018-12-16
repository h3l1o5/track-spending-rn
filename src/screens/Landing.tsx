import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, AppState } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Permissions from "react-native-permissions";
import _ from "lodash";

import { spendingLabelSelectors } from "../redux/reducers/spending-label.reducer";
import { permissionActionCreators } from "../redux/reducers/permission.reducer";
import { PermissionStatus, AppState as _AppState, SpendingLabel } from "../typings";
import { globalActionCreators } from "../redux/reducers/global.reducer";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  modifyLocationPermission: (status: PermissionStatus) => void;
  spendingLabels: SpendingLabel[];
  isFirstTimeUser: boolean;
  onboard: () => void;
}
interface State {
  firstTimeUserChecked: boolean;
  permissionsChecked: boolean;
}

export class Landing extends Component<Props> {
  public state: State = {
    firstTimeUserChecked: false,
    permissionsChecked: false,
  };

  private checkPermissions = async () => {
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
      this.setState({ permissionsChecked: true });
    } catch (error) {
      console.error(error);
    }
  };

  private checkIsFirstTimeUser = () => {
    if (this.props.isFirstTimeUser) {
      this.props.onboard();
    }
    this.setState({ firstTimeUserChecked: true });
  };

  public async componentDidMount() {
    this.checkPermissions();
    this.checkIsFirstTimeUser();
  }

  public async componentDidUpdate() {
    if (this.state.firstTimeUserChecked && this.state.permissionsChecked) {
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
    isFirstTimeUser: state.global.isFirstTime,
    spendingLabels: spendingLabelSelectors.getSpendingLabels(state),
  }),
  {
    onboard: globalActionCreators.onboard,
    modifyLocationPermission: permissionActionCreators.modifyLocationPermission,
  }
)(Landing);
