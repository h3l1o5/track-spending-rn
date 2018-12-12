import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { firestore, auth } from "react-native-firebase";
import _ from "lodash";

import { DEFAULT_SPENDING_LABELS } from "../constants";
import { connect } from "react-redux";
import { spendingLabelActionCreators } from "../redux/reducers/spending-label.reducer";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  fetchSpendingLabels: (onSuccess: () => void) => void;
}
interface State {
  isSpendingLabelsReady: boolean;
}

export class Landing extends Component<Props> {
  public state: State = {
    isSpendingLabelsReady: false,
  };

  public async componentDidMount() {
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
    } catch (error) {
      console.error(error);
    }
    this.props.fetchSpendingLabels(() => this.setState({ isSpendingLabelsReady: true }));
  }

  public async componentDidUpdate() {
    if (this.state.isSpendingLabelsReady) {
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
  { fetchSpendingLabels: spendingLabelActionCreators.fetchSpendingLabel }
)(Landing);
