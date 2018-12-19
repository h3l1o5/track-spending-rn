import React, { Component } from "react";
import { Content } from "native-base";
import { connect } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import { SafeAreaView } from "react-native";
import moment from "moment";
import _ from "lodash";

import { AppState, Consumption } from "../../typings";
import { consumptionSelectors } from "../../redux/reducers/consumption.reducer";
import MonthlyConsumptionList from "./MonthlyConsumptionList";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  consumptions: Consumption[];
}
export class History extends Component<Props> {
  public render() {
    const monthlyConsumptionSections = _.chain(this.props.consumptions)
      .groupBy(consumption => moment(consumption.time).format("YYYYMMDD"))
      .map((value, key) => ({ id: key, title: moment(key, "YYYYMMDD").format("D號"), data: value }))
      .orderBy(["id", "createdAt"], ["desc", "desc"])
      .groupBy(dateConsumptions => moment(dateConsumptions.id, "YYYYMMDD").format("YYYYMM"))
      .map((value, key) => ({ id: key, title: moment(key, "YYYYMM").format("YYYY年M月"), data: [value] }))
      .orderBy("id", "desc")
      .value();

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Content padder contentContainerStyle={{ paddingTop: 40 }}>
          <MonthlyConsumptionList monthlyConsumptionSections={monthlyConsumptionSections} />
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect((state: AppState) => ({
  consumptions: consumptionSelectors.getConsumptions(state),
}))(History);
