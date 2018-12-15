import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { View, Text, Button, Icon } from "native-base";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import color from "../../theme/color";
import { getPermission } from "../../utils";
import { AppState, PermissionStatus } from "../../typings";
import { permissionSelectors } from "../../redux/reducers/permission.reducer";

interface State {
  region: Region | null;
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
  locationPermissionStatus: PermissionStatus | null;
}

export class ChooseLocation extends Component<Props> {
  public mapRef?: MapView | null;
  public state: State = {
    region: null,
  };

  public handleFindmePressed = async () => {
    if (this.props.locationPermissionStatus === "authorized") {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (this.mapRef) {
            this.mapRef.animateToCoordinate(
              { latitude: position.coords.latitude, longitude: position.coords.longitude },
              500
            );
          }
        },
        error => console.error(error)
      );
    } else {
      const locationPermission = await getPermission("location");

      if (locationPermission === "authorized") {
        navigator.geolocation.getCurrentPosition(
          position => {
            if (this.mapRef) {
              this.mapRef.animateToCoordinate(
                { latitude: position.coords.latitude, longitude: position.coords.longitude },
                500
              );
            }
          },
          error => console.error(error)
        );
      }
    }
  };

  public render() {
    const { region } = this.state;
    const { navigation } = this.props;
    const onRegionChanged = navigation.getParam("onRegionChanged");
    const initialRegion = navigation.getParam("initialRegion");

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={c => (this.mapRef = c)}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          onRegionChangeComplete={region => this.setState({ region })}
          style={{ height: "100%", width: "100%" }}
        />
        <Icon
          type="Ionicons"
          name="md-pin"
          style={{
            color: color.red,
            fontSize: 40,
            position: "absolute",
            bottom: "50%",
            alignSelf: "center",
          }}
        />
        <Button
          small
          bordered
          dark
          style={{ position: "absolute", top: 40, left: 20, zIndex: 100 }}
          onPress={() => navigation.goBack()}
        >
          <Text>返回</Text>
        </Button>
        <Button
          small
          style={{ position: "absolute", bottom: 30, alignSelf: "center", zIndex: 100, backgroundColor: color.primary }}
          onPress={() => {
            onRegionChanged(region);
            navigation.goBack();
          }}
        >
          <Text>選擇</Text>
        </Button>
        <TouchableOpacity onPress={this.handleFindmePressed}>
          <Icon
            type="MaterialCommunityIcons"
            name="radar"
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              zIndex: 100,
              color: color.secondary,
              fontSize: 40,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  (state: AppState) => ({
    locationPermissionStatus: permissionSelectors.getLocationPermissionStatus(state),
  }),
  null
)(ChooseLocation);
