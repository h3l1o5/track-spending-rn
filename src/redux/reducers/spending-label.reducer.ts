import { combineReducers } from "redux";
import { produce } from "immer";
import { normalize, schema } from "normalizr";
import { SpendingLabel, AppState } from "../../typings";

const spendingLabel = new schema.Entity("spendingLabels");

const FETCH_SPENDING_LABELS = "SPENDING-LABEL:FETCH_SPENDING_LABELS";
const FETCH_SPENDING_LABELS_SUCCESS = "SPENDING-LABEL:FETCH_SPENDING_LABELS_SUCCESS";
const FETCH_SPENDING_LABELS_FAILED = "SPENDING-LABEL:FETCH_SPENDING_LABELS_FAILED";

export const spendingLabelActionTypes = {
  FETCH_SPENDING_LABELS,
  FETCH_SPENDING_LABELS_SUCCESS,
  FETCH_SPENDING_LABELS_FAILED,
};

const fetchSpendingLabel = (onSuccess: any) => ({
  type: FETCH_SPENDING_LABELS,
  meta: { onSuccess },
});

const fetchSpendingLabelSuccess = (spendingLabels: SpendingLabel[]) => ({
  type: FETCH_SPENDING_LABELS_SUCCESS,
  payload: { normalizedSpendingLabels: normalize(spendingLabels, [spendingLabel]) },
});

const fetchSpendingLabelFailed = (error: any) => ({
  type: FETCH_SPENDING_LABELS_SUCCESS,
  payload: { error },
  error: true,
});

export const spendingLabelActionCreators = {
  fetchSpendingLabel,
  fetchSpendingLabelSuccess,
  fetchSpendingLabelFailed,
};

const ids = (state = null, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_SPENDING_LABELS_SUCCESS:
        return payload.normalizedSpendingLabels.result;
    }
  });

const byId = (state = null, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case FETCH_SPENDING_LABELS_SUCCESS:
        return payload.normalizedSpendingLabels.entities.spendingLabels;
    }
  });

export default combineReducers({
  ids,
  byId,
});

export const spendingLabelSelectors = {
  getSpendingLabels: (state: AppState) =>
    state.spendingLabel.ids !== null ? state.spendingLabel.ids.map(id => state.spendingLabel.byId[id]) : null,
};
