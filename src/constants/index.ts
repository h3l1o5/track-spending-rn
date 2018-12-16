import { Dimensions } from "react-native";

import CATEGORIES from "./categories";

const TABBAR_HEIGHT = 55;
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_HEIGHT_WITH_TABBAR = DEVICE_HEIGHT - TABBAR_HEIGHT;

export { CATEGORIES, TABBAR_HEIGHT, DEVICE_WIDTH, DEVICE_HEIGHT, DEVICE_HEIGHT_WITH_TABBAR };
