import React, { Component } from "react";
import { SectionList, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Icon, Card, CardItem, Text, View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";
import _ from "lodash";

import { Consumption, AppState, SpendingLabel } from "../../typings";
import color from "../../theme/color";

const styles = StyleSheet.create({
  icon: { fontSize: 20, marginRight: 5, color: color.dark },
});

interface State {
  expandedSections: string[];
}
interface Props {
  dailyConsumptionSections: Array<{
    id: string;
    title: string;
    data: Consumption[];
  }>;
  spendingLabelsById: { [id: string]: SpendingLabel };
}
export class Daily extends Component<Props> {
  public state: State = {
    expandedSections: [],
  };

  public handleSectionHeaderPressed = (sectionId: string) => {
    const { expandedSections } = this.state;

    if (_.includes(expandedSections, sectionId)) {
      this.setState({ expandedSections: _.pull(expandedSections, sectionId) });
    } else {
      this.setState({ expandedSections: [...expandedSections, sectionId] });
    }
  };

  public render() {
    const { dailyConsumptionSections, spendingLabelsById } = this.props;
    const { expandedSections } = this.state;

    return (
      <SectionList
        initialNumToRender={3}
        stickySectionHeadersEnabled={false}
        sections={dailyConsumptionSections}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 15,
              marginLeft: Platform.OS === "android" ? 1 : 0,
            }}
          >
            <Icon type="Octicons" name="primitive-dot" style={{ color: color.primary, height: 30, width: 30 }} />
            <TouchableOpacity activeOpacity={1} onPress={() => this.handleSectionHeaderPressed(section.id)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 28, color: color.primary, marginRight: 5 }}>{section.title}</Text>
                <Icon
                  name={_.includes(expandedSections, section.id) ? "ios-arrow-up" : "ios-arrow-down"}
                  style={{ color: color.dark, marginLeft: 5, fontSize: 18 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item, section }: { item: Consumption; index: number; section: any }) =>
          _.includes(expandedSections, section.id) ? (
            <View style={{ borderLeftColor: color.primary, borderLeftWidth: 3, padding: 10, marginLeft: 6 }}>
              <TouchableOpacity activeOpacity={1}>
                <Card>
                  <CardItem bordered header style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <Icon type="Feather" name="tag" style={styles.icon} />
                        <Text numberOfLines={1} adjustsFontSizeToFit={true}>
                          {spendingLabelsById ? spendingLabelsById[item.selectedLabelId].name : ""}
                        </Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <Icon type="FontAwesome" name="dollar" style={styles.icon} />
                        <Text numberOfLines={1} ellipsizeMode="middle" adjustsFontSizeToFit={true}>
                          {item.spending}
                        </Text>
                      </View>
                    </View>
                  </CardItem>
                  <CardItem
                    bordered
                    style={{
                      height: 200,
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.location ? (
                      <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ height: "100%", width: "100%" }}
                        initialRegion={{ ...item.location, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
                        rotateEnabled={false}
                        scrollEnabled={false}
                        pitchEnabled={false}
                        toolbarEnabled={false}
                      >
                        <Marker coordinate={item.location} />
                      </MapView>
                    ) : (
                      <Text>沒有位置資訊</Text>
                    )}
                  </CardItem>
                  <CardItem footer>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                      <Icon type="Feather" name="message-square" style={styles.icon} />
                      <Text numberOfLines={1} ellipsizeMode="middle" adjustsFontSizeToFit={true}>
                        {item.comment || "無備註"}
                      </Text>
                    </View>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    );
  }
}

export default connect((state: AppState) => ({
  spendingLabelsById: state.spendingLabel.byId,
}))(Daily);
