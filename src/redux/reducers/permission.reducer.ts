import { PermissionStatus, AppState } from "../../typings";
import produce from "immer";

const MODIFY_LOCATION_PERMISSION = "PERMISSION:MODIFY_LOCATION_PERMISSION";

export const permissionActionTypes = {
  MODIFY_LOCATION_PERMISSION,
};

const modifyLocationPermission = (status: PermissionStatus) => ({
  type: MODIFY_LOCATION_PERMISSION,
  payload: { status },
});

export const permissionActionCreators = {
  modifyLocationPermission,
};

interface State {
  location: boolean | null;
}
export default (state: State = { location: null }, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case MODIFY_LOCATION_PERMISSION:
        draft.location = payload.status;
        break;
    }
  });

export const permissionSelectors = {
  getLocationPermissionStatus: (state: AppState) => state.permission.location,
};
