import React, { Component } from "react";
import { Text, View, AppState } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { firestore, auth } from "react-native-firebase";
import _ from "lodash";

import { DEFAULT_SPENDING_LABELS } from "../constants";
import { connect } from "react-redux";
import { spendingLabelActionCreators } from "../redux/reducers/spending-label.reducer";
import Permissions from "react-native-permissions";
import { permissionActionCreators } from "../redux/reducers/permission.reducer";
import { PermissionStatus } from "../typings";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  modifyLocationPermission: (status: PermissionStatus) => void;
  fetchSpendingLabels: (onSuccess: () => void) => void;
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

  private prepareSpendingLabels = async () => {
    try {
      const credential = await auth().signInAnonymously();
      const userUid = credential.user.uid;

      await firestore().runTransaction(transaction => {
        const userDocRef = firestore()
          .collection("user")
          .doc(userUid);

        return transaction.get(userDocRef).then(userDoc => {
          if (!userDoc.exists) {
            transaction.set(userDocRef, { createdAt: new Date() });

            _.forEach(DEFAULT_SPENDING_LABELS, defaultSpendingLabel => {
              const spendingLabelDocRef = firestore()
                .collection(`user/${userUid}/spendingLabel`)
                .doc(`${defaultSpendingLabel.category}_${defaultSpendingLabel.name}`);

              transaction.set(spendingLabelDocRef, { ...defaultSpendingLabel, createdAt: new Date() });
            });
          } else {
            // transaction must do something or it will be broken??
            transaction.set(userDocRef, {}, { merge: true });
          }
        });
      });

      this.props.fetchSpendingLabels(() => this.setState({ isSpendingLabelsReady: true }));
    } catch (error) {
      console.error(error);
    }
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
  null,
  {
    modifyLocationPermission: permissionActionCreators.modifyLocationPermission,
    fetchSpendingLabels: spendingLabelActionCreators.fetchSpendingLabel,
  }
)(Landing);
