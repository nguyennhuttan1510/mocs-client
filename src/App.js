import React from 'react'
import { Provider } from 'react-redux'
import SocketClient from 'services/SocketIO/SocketClient'
import Routes from 'Routes'
import store from 'stores/store'
import { BrowserRouter as Router } from 'react-router-dom'
import WrapRoute from 'components/WrapRoute'
import 'App.scss'
import 'antd/dist/antd.css'
import history from 'util/History'
import ErrorBoundary from 'components/ErrorBoundary'
const App = (props) => {
    return (
        // <ErrorBoundary>
        <Provider store={store}>
            <SocketClient>
                <Router history={history}>
                    <WrapRoute>
                        <Routes />
                    </WrapRoute>
                </Router>
            </SocketClient>
        </Provider>
        // </ErrorBoundary>
    )
}

export default App
