import {call, put, takeEvery} from "redux-saga/effects";

const identity = (payload) => {
  return payload
};
const identityApi = (payload) => {
  return new Promise((resolve, error) => {
    resolve({
      ok: true,
      json: () => {
        return payload
      }
    })
  });
};
const identityBeforeSuccess = (action, values, response) => {
  return response
};

const apiWrapper = (apiPromise) => {
  return apiPromise
    .then((response) => response.json())
    .catch((error) => { throw error })
};

export default (actionGenerator, validation = identity, api = identityApi, postSuccess,
                beforeSuccess = identityBeforeSuccess) => {
  return {
    handler: function* (action) {

      try {
        const values = yield validation(action.payload);
        const response = yield call(apiWrapper, api(values));
        const newResponse = yield beforeSuccess(action, values, response);
        yield put(actionGenerator.success(newResponse));
        if (postSuccess) yield postSuccess(action, values, newResponse);

      } catch (error) {
        yield put(actionGenerator.failure(error));
      }
    },
    watcher : function* () {
      yield takeEvery(actionGenerator.REQUEST, this.handler);
    }
  }
}
