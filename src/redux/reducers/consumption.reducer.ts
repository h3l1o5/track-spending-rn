import produce from "immer";
import { combineReducers } from "redux";
import _ from "lodash";

import { Consumption, AppState, ConsumptionCreateProperties, ConsumptionUpdateProperties } from "../../typings";
import { uid } from "../../utils";

const CREATE_CONSUMPTION = "CONSUMPTION:CREATE_CONSUMPTION";
const UPDATE_CONSUMPTION = "CONSUMPTION:UPDATE_CONSUMPTION";
const DELETE_CONSUMPTION = "CONSUMPTION:DELETE_CONSUMPTION";

export const consumptionActionTypes = {
  CREATE_CONSUMPTION,
  UPDATE_CONSUMPTION,
  DELETE_CONSUMPTION,
};

const createConsumption = (consumption: ConsumptionCreateProperties) => ({
  type: CREATE_CONSUMPTION,
  payload: { consumption: { ...consumption, id: uid(), createdAt: Date.now() } },
});

const updateConsumption = (id: string, properties: ConsumptionUpdateProperties) => ({
  type: UPDATE_CONSUMPTION,
  payload: { id, properties },
});

const deleteConsumption = (id: string) => ({
  type: DELETE_CONSUMPTION,
  payload: { id },
});

export const consumptionActionCreators = {
  createConsumption,
  updateConsumption,
  deleteConsumption,
};

const ids = (state: string[] = [], { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_CONSUMPTION:
        draft.push(payload.consumption.id);
        break;
      case DELETE_CONSUMPTION:
        return draft.filter(id => id !== payload.id);
    }
  });

const byId = (state: { [id: string]: Consumption } = {}, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_CONSUMPTION:
        draft[payload.consumption.id] = payload.consumption;
        break;
      case UPDATE_CONSUMPTION:
        draft[payload.id] = { ...draft[payload.id], ...payload.properties };
        break;
      case DELETE_CONSUMPTION:
        delete draft[payload.id];
        break;
    }
  });

export default combineReducers({ ids, byId });

export const consumptionSelectors = {
  getConsumptions: (state: AppState) => state.consumption.ids.map(id => state.consumption.byId[id]),
  isSpendingLabelUsed: (state: AppState, spendingLabelId: string) =>
    !_.chain(state.consumption.ids)
      .map(id => state.consumption.byId[id])
      .find(consumption => consumption.selectedLabelId === spendingLabelId)
      .isNil()
      .value(),
};
