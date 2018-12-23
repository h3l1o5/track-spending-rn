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
export class EditLabel extends Component<Props> {
  public render() {
    const consumption: Consumption = this.props.navigation.getParam("consumption");
    const spendingLabels: SpendingLabel[] = this.props.navigation.getParam("spendingLabels");
    const onSelect: (id: string) => void = this.props.navigation.getParam("onSelect");

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
                  this.props.navigation.goBack();
                }}
              >
                <Body>
                  <Text>
                    {getCategoryIcon(spendingLabel.category)} {spendingLabel.name}
                  </Text>
                </Body>
                <Right>
                  {consumption.selectedLabelId === spendingLabel.id ? (
                    <Icon type="Feather" name="check" style={{ color: color.dark }} />
                  ) : null}
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </SafeAreaView>
    );
  }
}

export default EditLabel;
