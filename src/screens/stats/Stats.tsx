import React, { useState, useEffect } from "react";
import { Content, Text, View, Button } from "native-base";
import { SafeAreaView } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";
import _ from "lodash";
import Supercluster from "supercluster";

import { AppState, Consumption } from "../../typings";
import { consumptionSelectors } from "../../redux/reducers/consumption.reducer";

const FEATURE: "Feature" = "Feature";
const POINT: "Point" = "Point";
const superCluster = new Supercluster({ radius: 30, maxZoom: 20, minZoom: 0 });

interface Props {
  consumptionsWithLocation: Consumption[];
}

const Stats = (props: Props) => {
  const [region, setRegion] = useState({
    latitude: 24,
    longitude: 121,
    latitudeDelta: 3,
    longitudeDelta: 3,
  });
  const [ready, setReady] = useState(0);

  useEffect(
    () => {
      superCluster.load(
        props.consumptionsWithLocation.map(consumption => ({
          type: FEATURE,
          properties: { consumption },
          geometry: {
            type: POINT,
            coordinates: [_.get(consumption, "location.longitude"), _.get(consumption, "location.latitude")],
          },
        }))
      );

      // Force update after each load.
      setReady(ready + 1);
    },
    [props.consumptionsWithLocation]
  );

  if (ready === 0) {
    return null;
  }

  const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
  const bBox = [
    region.longitude - region.longitudeDelta,
    region.latitude - region.latitudeDelta,
    region.longitude + region.longitudeDelta,
    region.latitude + region.latitudeDelta,
  ];
  const clusters = superCluster.getClusters([bBox[0], bBox[1], bBox[2], bBox[3]], zoom).map(cluster => {
    if (!cluster.properties.cluster) {
      return cluster;
    }

    const leaves = superCluster.getLeaves(cluster.properties.cluster_id, Infinity);

    cluster.properties.leaves = leaves;
    cluster.properties.spendingSum = leaves.reduce(
      (spendingSum, leave) => spendingSum + leave.properties.consumption.spending,
      0
    );

    return cluster;
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={{ height: "100%" }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            onRegionChange={region => setRegion(region)}
            style={{ height: "100%", width: "100%" }}
          >
            {clusters.map(cluster =>
              cluster.properties.cluster ? (
                <Marker
                  key={cluster.properties.cluster_id}
                  coordinate={{
                    longitude: cluster.geometry.coordinates[0],
                    latitude: cluster.geometry.coordinates[1],
                  }}
                  onPress={() => console.log(cluster)}
                >
                  <Button rounded warning>
                    <Text>${cluster.properties.spendingSum}</Text>
                  </Button>
                </Marker>
              ) : (
                <Marker
                  key={cluster.properties.consumption.id}
                  coordinate={{
                    longitude: cluster.geometry.coordinates[0],
                    latitude: cluster.geometry.coordinates[1],
                  }}
                  onPress={() => console.log(cluster)}
                />
              )
            )}
          </MapView>
        </View>
      </Content>
    </SafeAreaView>
  );
};

export default connect((state: AppState) => ({
  consumptionsWithLocation: consumptionSelectors.getConsumptions(state),
}))(Stats);
