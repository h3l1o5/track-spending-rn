import React, { useState } from "react";
import { SectionList, TouchableOpacity } from "react-native";
import { Icon, Text, View } from "native-base";
import _ from "lodash";

import { Consumption } from "../../typings";
import color from "../../theme/color";
import DailyConsumptionList from "./DailyConsumptionList";

interface Props {
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

const Monthly = (props: Props) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const handleSectionHeaderPressed = (sectionId: string) => {
    if (_.includes(expandedSections, sectionId)) {
      setExpandedSections(_.without(expandedSections, sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  return (
    <SectionList
      stickySectionHeadersEnabled={false}
      sections={props.monthlyConsumptionSections}
      keyExtractor={item => item.id}
      renderSectionHeader={({ section }) => (
        <TouchableOpacity activeOpacity={1} onPress={() => handleSectionHeaderPressed(section.id)}>
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
        _.includes(expandedSections, section.id) ? <DailyConsumptionList dailyConsumptionSections={item} /> : null
      }
    />
  );
};

export default Monthly;
