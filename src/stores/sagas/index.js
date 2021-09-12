import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { authAction } from 'stores/reducers/user'
import auth from './auth'
// import Api from '...';

// Worker saga will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//     // try {
//     //   const user = yield call(Api.fetchUser, action.payload.userId);
//     //   yield put({ type: 'USER_FETCH_SUCCEEDED', user: user });
//     // } catch (e) {
//     //   yield put({ type: 'USER_FETCH_FAILED', message: e.message });
//     // }
//     console.log('run fetch User')
//     // yield takeEvery('*', log)
//     console.log(authAction.loginSuccess().type)
//     yield put({ type: authAction.loginSuccess().type })
// }

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* rootSaga() {
    yield all([auth()])
}
