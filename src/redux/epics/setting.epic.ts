import { ofType, Epic, combineEpics } from "redux-observable";
import { map, filter, switchMap } from "rxjs/operators";
import { from } from "rxjs";
import _ from "lodash";

import { settingActionTypes, settingActionCreators } from "../reducers/setting.reducer";
import { getPermission } from "../../utils";
import { permissionSelectors } from "../reducers/permission.reducer";

const checkPermissionAfterEnableAutoLocateEpic: Epic<any, any> = (action$, state$) =>
  action$.pipe(
    ofType(settingActionTypes.SET_AUTO_LOCATE),
    filter(
      ({ payload, meta }) =>
        !meta.fromEpic &&
        payload.enabled &&
        permissionSelectors.getLocationPermissionStatus(state$.value) !== "authorized"
    ),
    switchMap(() =>
      from(getPermission("location")).pipe(
        map(locationPermission => {
          return settingActionCreators.setAutoLocate(locationPermission === "authorized", true);
        })
      )
    )
  );

export default combineEpics(checkPermissionAfterEnableAutoLocateEpic);
