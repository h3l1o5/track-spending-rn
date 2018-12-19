import React, { Component } from "react";
import { Content, Text, Card, CardItem, View, Icon } from "native-base";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { SafeAreaView, StyleSheet, SectionList, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import produce from "immer";
import moment from "moment";
import _ from "lodash";

import { AppState, Consumption, SpendingLabel } from "../../typings";
import { consumptionSelectors } from "../../redux/reducers/consumption.reducer";
import color from "../../theme/color";

const styles = StyleSheet.create({
  icon: { fontSize: 20, marginRight: 5, color: color.dark },
});

interface State {
  expandedSections: string[];
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
  spendingLabelsById: { [id: string]: SpendingLabel };
  consumptions: Consumption[];
}
export class History extends Component<Props> {
  public state: State = {
    expandedSections: [],
  };

  public handleSectionHeaderPressed = (sectionTitle: string) => {
    const { expandedSections } = this.state;

    if (_.includes(expandedSections, sectionTitle)) {
      this.setState({ expandedSections: _.pull(expandedSections, sectionTitle) });
    } else {
      this.setState({ expandedSections: [...expandedSections, sectionTitle] });
    }
  };

  public render() {
    const { expandedSections } = this.state;

    const consumptionSections = _.chain(this.props.consumptions)
      .orderBy(["time", "createdAt"], ["desc", "desc"])
      .groupBy(consumption => moment(consumption.time).format("YYYY年M月"))
      .map((value, key) => ({ title: key, data: value }))
      .value();

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content padder>
          <SectionList
            initialNumToRender={3}
            stickySectionHeadersEnabled={false}
            sections={consumptionSections}
            keyExtractor={item => item.id}
            renderSectionHeader={({ section }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: _.includes(expandedSections, section.title) ? 0 : 15,
                }}
              >
                <Icon type="Octicons" name="primitive-dot" style={{ color: color.primary, height: 30, width: 30 }} />
                <TouchableOpacity onPress={() => this.handleSectionHeaderPressed(section.title)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 28, color: color.primary, fontWeight: "bold" }}>{section.title}</Text>
                    <Icon
                      name={_.includes(expandedSections, section.title) ? "ios-arrow-up" : "ios-arrow-down"}
                      style={{ color: color.dark, marginLeft: 5, fontSize: 18 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            renderItem={({ item, index, section }: { item: Consumption; index: number; section: any }) =>
              _.includes(expandedSections, section.title) ? (
                <View style={{ borderLeftColor: color.primary, borderLeftWidth: 3, padding: 10, marginLeft: 6 }}>
                  <TouchableOpacity activeOpacity={1}>
                    <Card>
                      <CardItem bordered header style={{ flexDirection: "column", alignItems: "flex-start" }}>
                        <Text note style={{ marginBottom: 10 }}>
                          {moment(item.time).format("YYYY/M/D")}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <Icon type="Feather" name="tag" style={styles.icon} />
                            <Text numberOfLines={1} adjustsFontSizeToFit={true}>
                              {this.props.spendingLabelsById[item.selectedLabelId].name}
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
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect((state: AppState) => ({
  spendingLabelsById: state.spendingLabel.byId,
  consumptions: consumptionSelectors.getConsumptions(state),
}))(History);
