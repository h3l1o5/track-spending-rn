import React from "react";
import { createStackNavigator } from "react-navigation";

import color from "../../theme/color";

import Setting from "../../screens/setting/Setting";
import LabelList from "../../screens/setting/LabelList";

export default createStackNavigator(
  {
    Setting,
    LabelList,
  },
  {
    headerMode: "float",
    cardStyle: {
      backgroundColor: color.light,
    },
  }
);
