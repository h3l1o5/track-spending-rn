import produce from "immer";
import uuid from "uuid/v4";

import { Consumption, AppState } from "../../typings";
import { combineReducers } from "redux";

const CREATE_CONSUMPTION = "CONSUMPTION:CREATE_CONSUMPTION";

export const consumptionActionTypes = {
  CREATE_CONSUMPTION,
};

const createConsumption = (partialConsumption: {
  spending: number;
  selectedLabelId: string;
  time: Date;
  location: { latitude: number; longitude: number } | null;
  comment: string | null;
}) => ({
  type: CREATE_CONSUMPTION,
  payload: { consumption: { ...partialConsumption, id: uuid(), createdAt: new Date() } },
});

export const consumptionActionCreators = {
  createConsumption,
};

const ids = (state: string[] = [], { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_CONSUMPTION:
        draft.push(payload.consumption.id);
        break;
    }
  });

const byId = (state: { [id: string]: Consumption } = {}, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case CREATE_CONSUMPTION:
        draft[payload.consumption.id] = payload.consumption;
        break;
    }
  });

export default combineReducers({ ids, byId });

export const consumptionSelectors = {
  getConsumptions: (state: AppState) => state.consumption.ids.map(id => state.consumption.byId[id]),
};
