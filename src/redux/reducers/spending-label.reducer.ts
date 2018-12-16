import { combineReducers } from "redux";
import { produce } from "immer";
import { normalize, schema } from "normalizr";
import _ from "lodash";

import { AppState, SpendingLabel } from "../../typings";
import { getDefaultSpendingLabels } from "../../utils";

const CREATE_DEFAULT_SPENDING_LABELS = "SPENDING-LABEL:CREATE_DEFAULT_SPENDING_LABELS";

export const spendingLabelActionTypes = {
  CREATE_DEFAULT_SPENDING_LABELS,
};

const createDefaultSpendingLabels = (): any => ({
  type: CREATE_DEFAULT_SPENDING_LABELS,
  payload: { normalizedSpendingLabels: normalize(getDefaultSpendingLabels(), [new schema.Entity("spendingLabels")]) },
});

export const spendingLabelActionCreators = {
  createDefaultSpendingLabels,
};

const ids = (state: string[] = [], { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_DEFAULT_SPENDING_LABELS:
        return payload.normalizedSpendingLabels.result;
    }
  });

const byId = (state: { [id: string]: SpendingLabel } = {}, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_DEFAULT_SPENDING_LABELS:
        return payload.normalizedSpendingLabels.entities.spendingLabels;
    }
  });

export default combineReducers({
  ids,
  byId,
});

export const spendingLabelSelectors = {
  getSpendingLabels: (state: AppState) => state.spendingLabel.ids.map(id => state.spendingLabel.byId[id]),
};
