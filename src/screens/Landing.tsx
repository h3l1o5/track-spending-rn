import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import firebase from "react-native-firebase";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export class Landing extends Component<Props> {
  public async componentDidMount() {
    try {
      await firebase.auth().signInAnonymously();

      console.log(firebase.auth().currentUser);

      this.props.navigation.navigate("Main");
    } catch (error) {
      console.error(error);
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

export default Landing;
