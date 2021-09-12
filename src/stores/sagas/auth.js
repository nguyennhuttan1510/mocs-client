import { fork, call, put, take } from 'redux-saga/effects'
import { authAction } from 'stores/reducers/user'
import Authenticator from 'api/auth'
import { CONSTANT } from 'stores/constants'

function* handleLogin(payload) {
    console.log('Login')
    console.log(payload.params)
    const res = yield call(Authenticator.login, payload.params)
    console.log('🚀 ~ file: auth.js ~ line 9 ~ function*handleLogin ~ res', res)
    if (res.status) {
        console.log('was accessed')
        yield put({ type: authAction.loginSuccess().type, payload: res.data })
        payload.callback(res)
    } else {
        console.log("wasn't accessed")
        yield put({ type: authAction.loginFail().type })
        throw new Error('')
    }
}

function* handleLogout() {
    console.log('Logout')
    yield put({ type: authAction.logoutSuccess().type })
}

function* wrapFlowAccess() {
    console.log('saga-auth')
    while (true) {
        // ALLOW ACCESS AGAIN WHEN IT FAILED
        let access = false
        while (!access) {
            const action = yield take(CONSTANT.ACTION_TYPE.LOGIN)
            try {
                yield call(handleLogin, action.payload)
                access = true
            } catch (error) {
                access = false
            }
        }

        //LOGOUT
        yield take(CONSTANT.ACTION_TYPE.LOGOUT)
        yield call(handleLogout)
    }
}

export default function* auth() {
    yield fork(wrapFlowAccess)
}
