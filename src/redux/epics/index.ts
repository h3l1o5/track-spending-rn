import { combineEpics } from "redux-observable";

import setting from "./setting.epic";

export default combineEpics(setting);
