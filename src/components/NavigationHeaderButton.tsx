import React, { Component } from "react";
import { Text, Icon } from "native-base";
import { TouchableOpacity, Platform } from "react-native";
import { withNavigation, NavigationInjectedProps } from "react-navigation";

import color from "../theme/color";

type IconType =
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

interface Props {
  iconType?: IconType;
  iconName: string;
  onPress?: () => any;
}

class NavigationHeaderButton extends Component<Props & NavigationInjectedProps, any> {
  public render() {
    const { onPress, iconType, iconName } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={{ width: 64, alignItems: "center" }}>
        <Icon name={iconName || ""} type={iconType || "Ionicons"} style={{ color: color.dark }} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(NavigationHeaderButton);
