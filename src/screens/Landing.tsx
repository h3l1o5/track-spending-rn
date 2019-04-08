import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Text, View, AppState } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Permissions from "react-native-permissions";
import _ from "lodash";

import { permissionActionCreators } from "../redux/reducers/permission.reducer";
import { PermissionStatus, AppState as _AppState } from "../typings";
import { globalActionCreators } from "../redux/reducers/global.reducer";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  modifyLocationPermission: (status: PermissionStatus) => void;
  isFirstTimeUser: boolean;
  onboard: () => void;
}

const Landing = (props: Props) => {
  const [isCheckedFirstTimeUser, setIsCheckedFirstTimeUser] = useState(false);
  const [isCheckedPermission, setIsCheckedPermission] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(false);

  const checkPermissions = async () => {
    const handleAppStateChange = async (nextAppState: "active" | "background" | "inactive") => {
      if (nextAppState === "active") {
        try {
          const locationPermission = await Permissions.check("location");
          props.modifyLocationPermission(locationPermission);
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
      props.modifyLocationPermission(locationPermission);
      setIsCheckedPermission(true);
    } catch (error) {
      console.error(error);
    }
  };

  const checkFirstTimeUser = () => {
    if (props.isFirstTimeUser) {
      props.onboard();
    }
    setIsCheckedFirstTimeUser(true);
  };

  useEffect(
    () => {
      if (!isCheckedFirstTimeUser) {
        checkFirstTimeUser();
      }

      if (!isCheckedPermission && !isCheckingPermission) {
        setIsCheckingPermission(true);
        checkPermissions();
      }

      if (isCheckedFirstTimeUser && isCheckedPermission) {
        props.navigation.navigate("Main");
      }
    },
    [isCheckedFirstTimeUser, isCheckedPermission]
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Loading ... </Text>
    </View>
  );
};

export default connect(
  (state: _AppState) => ({
    isFirstTimeUser: state.global.isFirstTime,
  }),
  {
    onboard: globalActionCreators.onboard,
    modifyLocationPermission: permissionActionCreators.modifyLocationPermission,
  }
)(Landing);
