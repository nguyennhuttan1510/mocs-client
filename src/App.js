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
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ScrollToTop from 'components/ScrollToTop'

const App = (props) => {
    return (
        // <ErrorBoundary>
        <Provider store={store}>
            <SocketClient>
                <Router history={history}>
                    <ScrollToTop />
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
