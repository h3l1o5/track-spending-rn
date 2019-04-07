import React, { Component } from "react";
import { Text, SafeAreaView } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import color from "../../theme/color";
import { Consumption, SpendingLabel } from "../../typings";
import { Content, List, ListItem, Body, Right, Icon } from "native-base";
import { getCategoryIcon } from "../../utils";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
const EditLabel = (props: Props) => {
  const consumption: Consumption = props.navigation.getParam("consumption");
  const spendingLabels: SpendingLabel[] = props.navigation.getParam("spendingLabels");
  const onSelect: (id: string) => void = props.navigation.getParam("onSelect");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content>
        <List style={{ marginBottom: 20 }}>
          {_.map(spendingLabels, spendingLabel => (
            <ListItem
              key={spendingLabel.id}
              style={{ marginVertical: 10 }}
              button
              onPress={() => {
                onSelect(spendingLabel.id);
                props.navigation.goBack();
              }}
            >
              <Body>
                <Text>
                  {getCategoryIcon(spendingLabel.category)} {spendingLabel.name}
                </Text>
              </Body>
              <Right>
                {consumption.selectedLabelId === spendingLabel.id ? (
                  <Icon type="AntDesign" name="check" style={{ color: color.dark }} />
                ) : null}
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </SafeAreaView>
  );
};

export default EditLabel;
