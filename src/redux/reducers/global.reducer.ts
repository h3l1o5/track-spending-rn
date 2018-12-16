import produce from "immer";

const ONBOARD = "GLOBAL:ONBOARD";

export const globalActionTypes = {
  ONBOARD,
};

const onboard = () => ({
  type: ONBOARD,
});

export const globalActionCreators = {
  onboard,
};

export default (state = { isFirstTime: true }, { type, payload }: { type: string; payload: any }) =>
  produce(state, draft => {
    switch (type) {
      case ONBOARD:
        draft.isFirstTime = false;
        break;
    }
  });
