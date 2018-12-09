import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Content, View, Text, Button, Icon } from "native-base";
import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";

import color from "../../theme/color";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export class Guest extends Component<Props> {
  private handleSigninWithGoogle = async () => {
    try {
      await GoogleSignin.configure({
        iosClientId: "761468936140-160sh9233mq946414v1glfl23knutvie.apps.googleusercontent.com",
      });

      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        String(googleUser.accessToken)
      );
      const currentUser = await firebase.auth().signInWithCredential(credential);

      console.log(currentUser);

      this.props.navigation.navigate("Main");
    } catch (error) {
      console.error(error);
    }
  };

  public render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content scrollEnabled={false} padder contentContainerStyle={{ flex: 1, padding: 30 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                position: "absolute",
                bottom: 0,
                fontWeight: "bold",
                color: color.white,
                fontSize: 36,
              }}
            >
              記帳。
            </Text>
          </View>
          <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
            <Button
              iconLeft
              light
              bordered
              rounded
              block
              style={{ marginVertical: 10 }}
              onPress={this.handleSigninWithGoogle}
            >
              <Icon type="FontAwesome" name="google" style={{ color: color.white }} />
              <Text style={{ color: color.white }}>使用Google帳號登入</Text>
            </Button>
            <Button iconLeft light bordered rounded block style={{ marginVertical: 10 }}>
              <Icon type="FontAwesome" name="facebook" style={{ color: color.white }} />
              <Text style={{ color: color.white }}>使用Facebook帳號登入</Text>
            </Button>
          </View>
        </Content>
      </SafeAreaView>
    );
  }
}

export default Guest;
