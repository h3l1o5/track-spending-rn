import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { Content, List, ListItem, Icon, Body, Right } from "native-base";
import _ from "lodash";

import color from "../../theme/color";
import { AppState, SpendingLabel, Category } from "../../typings";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  spendingLabels: SpendingLabel[] | null;
}

export class LabelList extends Component<Props> {
  public render() {
    const spendingLabels = this.props.spendingLabels || [];
    const renderSpendingLabels = (category: Category) => {
      const filteredLabels = _.filter(spendingLabels, spendingLabel => spendingLabel.category === category);
      return (
        <View key={category}>
          <Text style={{ color: color.secondary, padding: 15, fontSize: 40 }}>
            {getCategoryMandarin(category)} {getCategoryIcon(category)}
          </Text>
          <List style={{ marginBottom: 20 }}>
            {_.map(filteredLabels, spendingLabel => (
              <ListItem
                key={spendingLabel.id}
                style={{ marginVertical: 10 }}
                button
                onPress={() =>
                  this.props.navigation.navigate("LabelManager", { mode: "edit", labelId: spendingLabel.id })
                }
              >
                <Body>
                  <Text>{spendingLabel.name}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
          </List>
        </View>
      );
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content>
          {renderSpendingLabels("food")}
          {renderSpendingLabels("clothing")}
          {renderSpendingLabels("housing")}
          {renderSpendingLabels("transportation")}
          {renderSpendingLabels("education")}
          {renderSpendingLabels("entertainment")}
          {renderSpendingLabels("other")}
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect((state: AppState) => ({
  spendingLabels: spendingLabelSelectors.getSpendingLabels(state),
}))(LabelList);
