import React from "react";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
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

const NavigationHeaderButton = (props: Props & NavigationInjectedProps) => {
  const { onPress, iconType, iconName } = props;

  return (
    <TouchableOpacity onPress={onPress} style={{ width: 64, alignItems: "center" }}>
      <Icon name={iconName || ""} type={iconType || "Ionicons"} style={{ color: color.dark }} />
    </TouchableOpacity>
  );
};

export default withNavigation(NavigationHeaderButton);
