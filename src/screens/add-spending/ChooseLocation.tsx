import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Button, Icon } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import color from "../../theme/color";
import { getPermission } from "../../utils";
import { AppState, PermissionStatus } from "../../typings";
import { permissionSelectors } from "../../redux/reducers/permission.reducer";
import { DEVICE_HEIGHT_WITH_TABBAR } from "../../constants";
import { settingSelectors } from "../../redux/reducers/setting.reducer";

interface State {
  location: { latitude: number; longitude: number } | null;
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
  locationPermissionStatus: PermissionStatus | null;
  isAutoLocateEnabled: boolean;
}

export class ChooseLocation extends Component<Props> {
  public mapRef?: MapView | null;
  public state: State = {
    location: null,
  };

  public componentDidMount() {
    if (this.props.isAutoLocateEnabled && this.props.locationPermissionStatus === "authorized") {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        if (this.mapRef) {
          this.mapRef.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          });
        }
      });
    }
  }

  public handleFindmePressed = async () => {
    if (this.props.locationPermissionStatus === "authorized") {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (this.mapRef) {
            this.mapRef.animateToRegion(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005,
              },
              1000
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
              this.mapRef.animateToRegion(
                {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.0005,
                  longitudeDelta: 0.0005,
                },
                1000
              );
            }
          },
          error => console.error(error)
        );
      }
    }
  };

  public render() {
    const { location } = this.state;
    const { navigation } = this.props;
    const onLocationChanged = navigation.getParam("onLocationChanged");
    const initialLocation = navigation.getParam("initialLocation");
    const initialRegion = initialLocation
      ? { ...initialLocation, latitudeDelta: 0.0005, longitudeDelta: 0.0005 }
      : {
          latitude: 24,
          longitude: 121,
          latitudeDelta: 2,
          longitudeDelta: 2,
        };

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={c => (this.mapRef = c)}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          onRegionChangeComplete={region =>
            this.setState({ location: { latitude: region.latitude, longitude: region.longitude } })
          }
          style={{ height: "100%", width: "100%" }}
        />
        <Icon
          type="Ionicons"
          name="md-pin"
          style={{
            color: color.danger,
            fontSize: 40,
            position: "absolute",
            top: DEVICE_HEIGHT_WITH_TABBAR / 2 - 40,
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
        <View style={{ position: "absolute", bottom: 30, alignSelf: "center", zIndex: 100, flexDirection: "row" }}>
          <Button
            bordered
            style={{
              borderColor: "transparent",
            }}
            onPress={this.handleFindmePressed}
          >
            <Text style={{ color: color.secondary }}>目前位置</Text>
          </Button>
          <Button
            style={{ backgroundColor: color.primary }}
            onPress={() => {
              onLocationChanged(location);
              navigation.goBack();
            }}
          >
            <Text>選擇</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(
  (state: AppState) => ({
    isAutoLocateEnabled: settingSelectors.isAutoLocateEnabled(state),
    locationPermissionStatus: permissionSelectors.getLocationPermissionStatus(state),
  }),
  null
)(ChooseLocation);
