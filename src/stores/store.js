import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import user from 'stores/reducers/user'
import dashboard from './reducers/dashboard'
import management from './reducers/management'
import current from './reducers/current'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        user: user,
        dashboard: dashboard,
        management: management,
        current: current,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

// Then run the saga
sagaMiddleware.run(rootSaga)

// Render the application
export default store
