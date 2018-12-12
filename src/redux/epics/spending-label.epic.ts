import { ofType, Epic, combineEpics } from "redux-observable";
import { switchMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { spendingLabelActionTypes, spendingLabelActionCreators } from "../reducers/spending-label.reducer";
import firebase, { firestore } from "react-native-firebase";
import _ from "lodash";

const fetchSpendingLabelsEpic: Epic<any, any> = (action$, state$) =>
  action$.pipe(
    ofType(spendingLabelActionTypes.FETCH_SPENDING_LABELS),
    switchMap(({ payload, meta }) =>
      from(
        firestore()
          .collection(`user/${_.get(firebase.auth().currentUser, "uid")}/spendingLabel`)
          .orderBy("category")
          .get()
      ).pipe(
        map(({ docs }) => {
          meta.onSuccess();

          return spendingLabelActionCreators.fetchSpendingLabelSuccess(
            docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
          );
        }),
        catchError(error => of(spendingLabelActionCreators.fetchSpendingLabelFailed(error)))
      )
    )
  );

export default combineEpics(fetchSpendingLabelsEpic);
