import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Content, View, Text, Button, Icon } from "native-base";

import color from "../../theme/color";
import { NavigationAction, NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export class Guest extends Component<Props> {
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
              onPress={() => this.props.navigation.navigate("Main")}
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
