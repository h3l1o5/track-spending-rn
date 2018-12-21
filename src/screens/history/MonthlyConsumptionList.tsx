import React, { Component } from "react";
import { SectionList, TouchableOpacity } from "react-native";
import { Icon, Text, View } from "native-base";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import { Consumption } from "../../typings";
import color from "../../theme/color";
import DailyConsumptionList from "./DailyConsumptionList";

interface State {
  expandedSections: string[];
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
  monthlyConsumptionSections: Array<{
    id: string;
    title: string;
    data: Array<
      Array<{
        id: string;
        title: string;
        data: Consumption[];
      }>
    >;
  }>;
}
export class Monthly extends Component<Props> {
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
    const { monthlyConsumptionSections } = this.props;
    const { expandedSections } = this.state;

    return (
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={monthlyConsumptionSections}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity activeOpacity={1} onPress={() => this.handleSectionHeaderPressed(section.id)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderLeftColor: color.primary,
                  borderLeftWidth: 3,
                  padding: 10,
                  marginLeft: 6,
                }}
              >
                <Text style={{ fontSize: 40, color: color.primary, fontWeight: "bold", margin: 15, marginRight: 5 }}>
                  {section.title}
                </Text>
                <Icon
                  name={_.includes(expandedSections, section.id) ? "ios-arrow-up" : "ios-arrow-down"}
                  style={{ color: color.dark, marginLeft: 5, fontSize: 18 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderItem={({ item, section }) =>
          _.includes(expandedSections, section.id) ? (
            <DailyConsumptionList dailyConsumptionSections={item} navigation={this.props.navigation} />
          ) : null
        }
      />
    );
  }
}

export default Monthly;
