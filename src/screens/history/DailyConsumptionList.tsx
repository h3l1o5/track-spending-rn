import React, { Component } from "react";
import { SectionList, TouchableOpacity, Platform } from "react-native";
import { Icon, Text, View } from "native-base";
import _ from "lodash";

import { Consumption } from "../../typings";
import color from "../../theme/color";
import ConsumptionCard from "./ConsumptionCard";

interface State {
  expandedSections: string[];
}
interface Props {
  dailyConsumptionSections: Array<{
    id: string;
    title: string;
    data: Consumption[];
  }>;
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
    const { dailyConsumptionSections } = this.props;
    const { expandedSections } = this.state;

    return (
      <SectionList
        initialNumToRender={3}
        stickySectionHeadersEnabled={false}
        sections={dailyConsumptionSections}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity activeOpacity={1} onPress={() => this.handleSectionHeaderPressed(section.id)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 15,
                marginLeft: Platform.OS === "android" ? 1 : 0,
              }}
            >
              <Icon type="Octicons" name="primitive-dot" style={{ color: color.primary, height: 30, width: 30 }} />
              <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 28, color: color.primary, marginRight: 5 }}>{section.title}</Text>
                <Icon
                  name={_.includes(expandedSections, section.id) ? "ios-arrow-up" : "ios-arrow-down"}
                  style={{ color: color.dark, marginLeft: 5, fontSize: 18 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderItem={({ item, section }: { item: Consumption; index: number; section: any }) =>
          _.includes(expandedSections, section.id) ? (
            <View style={{ borderLeftColor: color.primary, borderLeftWidth: 3, padding: 10, marginLeft: 6 }}>
              <ConsumptionCard consumption={item} />
            </View>
          ) : null
        }
      />
    );
  }
}

export default Daily;
