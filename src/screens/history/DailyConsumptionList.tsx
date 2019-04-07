import React, { useState } from "react";
import { SectionList, TouchableOpacity, Platform } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Icon, Text, View } from "native-base";
import _ from "lodash";

import { Consumption } from "../../typings";
import color from "../../theme/color";
import ConsumptionCard from "./ConsumptionCard";

interface Props {
  dailyConsumptionSections: Array<{
    id: string;
    title: string;
    data: Consumption[];
  }>;
}
const DailyConsumptionList = (props: Props) => {
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
      initialNumToRender={3}
      stickySectionHeadersEnabled={false}
      sections={props.dailyConsumptionSections}
      keyExtractor={item => item.id}
      renderSectionHeader={({ section }) => (
        <TouchableOpacity activeOpacity={1} onPress={() => handleSectionHeaderPressed(section.id)}>
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
};

export default DailyConsumptionList;
