import { combineReducers } from "redux";

import permission from "./permission.reducer";
import setting from "./setting.reducer";
import spendingLabel from "./spending-label.reducer";
import consumption from "./consumption.reducer";

export default combineReducers({ permission, setting, spendingLabel, consumption });
