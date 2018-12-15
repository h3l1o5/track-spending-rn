import React, { Component } from "react";
import { Content, Text, List, ListItem, Left, Body, Right, Icon, Switch } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";

import color from "../../theme/color";
import { AppState, PermissionStatus } from "../../typings";
import { settingSelectors, settingActionCreators } from "../../redux/reducers/setting.reducer";
import { permissionSelectors } from "../../redux/reducers/permission.reducer";
import { getPermission } from "../../utils";

const styles = StyleSheet.create({
  itemIcon: { height: 30, width: 30, textAlign: "center", color: color.dark },
  itemText: { color: color.dark },
});

interface Props {
  locationPermission: PermissionStatus | null;
  isAutoLocateEnabled: boolean;
  setAutoLocate: (enabled: boolean) => void;
}
export class Setting extends Component<Props> {
  public render() {
    const { isAutoLocateEnabled, setAutoLocate } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 40,
              color: color.primary,
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            設定
          </Text>
          <List>
            <ListItem icon style={{ marginVertical: 10 }}>
              <Left>
                <Icon type="Feather" name="map-pin" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text style={styles.itemText}>自動定位</Text>
              </Body>
              <Right>
                <Switch
                  trackColor={{ false: color.gray, true: color.primary }}
                  value={isAutoLocateEnabled}
                  onValueChange={setAutoLocate}
                />
              </Right>
            </ListItem>
            <ListItem icon style={{ marginVertical: 10 }} button onPress={() => null}>
              <Left>
                <Icon type="Feather" name="tag" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text style={styles.itemText}>標籤</Text>
              </Body>
              <Right>
                <Text>18</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: AppState) => ({
    locationPermission: permissionSelectors.getLocationPermissionStatus(state),
    isAutoLocateEnabled: settingSelectors.isAutoLocateEnabled(state),
  }),
  { setAutoLocate: settingActionCreators.setAutoLocate }
)(Setting);
