import React, { Component } from "react";
import RootNavigator from "./navigators/RootNavigator";

interface Props {}
export default class App extends Component<Props> {
  public render() {
    return <RootNavigator />;
  }
}
