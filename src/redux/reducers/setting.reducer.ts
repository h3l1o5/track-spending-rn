import produce from "immer";
import { AppState } from "../../typings";
import { permissionActionTypes } from "./permission.reducer";

const SET_AUTO_LOCATE = "SETTING:SET_AUTO_LOCATE";

export const settingActionTypes = {
  SET_AUTO_LOCATE,
};

const setAutoLocate = (enabled: boolean, fromEpic?: boolean) => ({
  type: SET_AUTO_LOCATE,
  payload: { enabled },
  meta: { fromEpic },
});

export const settingActionCreators = {
  setAutoLocate,
};

interface State {
  autoLocateEnabled: boolean;
}
export default (state: State = { autoLocateEnabled: false }, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case SET_AUTO_LOCATE:
        draft.autoLocateEnabled = payload.enabled;
        break;
      case permissionActionTypes.MODIFY_LOCATION_PERMISSION:
        if (draft.autoLocateEnabled && payload.status !== "authorized") {
          draft.autoLocateEnabled = false;
        }
        break;
    }
  });

export const settingSelectors = {
  isAutoLocateEnabled: (state: AppState) => state.setting.autoLocateEnabled,
};
