import { combineReducers } from "redux";
import { produce } from "immer";
import { normalize, schema } from "normalizr";
import _ from "lodash";

import { AppState, SpendingLabel, Category } from "../../typings";
import { getDefaultSpendingLabels } from "../../utils";

const CREATE_DEFAULT_SPENDING_LABELS = "SPENDING-LABEL:CREATE_DEFAULT_SPENDING_LABELS";
const CREATE_SPENDING_LABEL = "SPENDING-LABEL:CREATE_SPENDING_LABEL";
const UPDATE_SPENDING_LABEL = "SPENDING-LABEL:UPDATE_SPENDING_LABEL";
const DELETE_SPENDING_LABEL = "SPENDING-LABEL:DELETE_SPENDING_LABEL";

export const spendingLabelActionTypes = {
  CREATE_DEFAULT_SPENDING_LABELS,
  CREATE_SPENDING_LABEL,
  UPDATE_SPENDING_LABEL,
  DELETE_SPENDING_LABEL,
};

const createDefaultSpendingLabels = (): any => ({
  type: CREATE_DEFAULT_SPENDING_LABELS,
  payload: { normalizedSpendingLabels: normalize(getDefaultSpendingLabels(), [new schema.Entity("spendingLabels")]) },
});

const createSpendingLabel = (spendingLabel: SpendingLabel) => ({
  type: CREATE_SPENDING_LABEL,
  payload: { spendingLabel },
});

const updateSpendingLabel = (id: string, properties: { category?: Category; name?: string }) => ({
  type: UPDATE_SPENDING_LABEL,
  payload: { id, properties },
});

const deleteSpendingLabel = (id: string) => ({
  type: DELETE_SPENDING_LABEL,
  payload: { id },
});

export const spendingLabelActionCreators = {
  createDefaultSpendingLabels,
  createSpendingLabel,
  updateSpendingLabel,
  deleteSpendingLabel,
};

const ids = (state: string[] = [], { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_DEFAULT_SPENDING_LABELS:
        return payload.normalizedSpendingLabels.result;
      case CREATE_SPENDING_LABEL:
        draft.push(payload.spendingLabel.id);
        break;
      case DELETE_SPENDING_LABEL:
        return _.filter(state, id => id !== payload.id);
    }
  });

const byId = (state: { [id: string]: SpendingLabel } = {}, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_DEFAULT_SPENDING_LABELS:
        return payload.normalizedSpendingLabels.entities.spendingLabels;
      case CREATE_SPENDING_LABEL:
        draft[payload.spendingLabel.id] = payload.spendingLabel;
        break;
      case UPDATE_SPENDING_LABEL:
        draft[payload.id] = { ...state[payload.id], ...payload.properties };
        break;
      case DELETE_SPENDING_LABEL:
        delete draft[payload.id];
        break;
    }
  });

export default combineReducers({
  ids,
  byId,
});

export const spendingLabelSelectors = {
  getSpendingLabels: (state: AppState) =>
    _.chain(state.spendingLabel.ids)
      .map(id => state.spendingLabel.byId[id])
      .orderBy("category")
      .value(),
};
