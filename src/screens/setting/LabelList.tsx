import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenConfig, NavigationScreenOptions } from "react-navigation";
import { Content, List, ListItem, Icon, Left, Body, Right } from "native-base";
import _ from "lodash";

import color from "../../theme/color";
import { AppState, SpendingLabel, Category } from "../../typings";
import { spendingLabelSelectors } from "../../redux/reducers/spending-label.reducer";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";
import NavigationHeaderButton from "../../components/NavigationHeaderButton";

interface Props {
  spendingLabels: SpendingLabel[] | null;
}

export class LabelList extends Component<Props> {
  public static navigationOptions: NavigationScreenConfig<NavigationScreenOptions> = ({ navigation }) => ({
    title: "管理標籤",
    headerTitleStyle: { color: color.primary },
    headerBackTitleStyle: { color: color.dark },
    headerTintColor: color.dark,
    headerStyle: { backgroundColor: color.light, borderBottomWidth: 0 },
    headerRight: <NavigationHeaderButton iconName="add" />,
  });

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
              <ListItem key={spendingLabel.id} style={{ marginVertical: 10 }}>
                <Body>
                  <Text style={{ color: color.dark }}>{spendingLabel.name}</Text>
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
