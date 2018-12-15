import { combineEpics } from "redux-observable";

import setting from "./setting.epic";
import spendingLabel from "./spending-label.epic";

export default combineEpics(setting, spendingLabel);
