import { css } from '@emotion/react'
import WrapRoute from 'components/WrapRoute'
import React, { lazy, Suspense } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
// import 'style/_Root.scss'
import RouteWithLayout from 'components/RouteWithLayout'

const Main = lazy(() => import('layouts/Main'))
const NoLayout = lazy(() => import('layouts/NoLayout'))
const SignIn = lazy(() => import('pages/Login'))
const Home = lazy(() => import('pages/Home'))
const Business = lazy(() => import('pages/Business'))
const Personnel = lazy(() => import('pages/Personnel'))
const Profile = lazy(() => import('pages/Profile'))

const Routes = () => {
    // CONFIG ROUTE
    const location = useLocation()
    const override = css`
        border-color: #001529;
    `
    const routes = [
        {
            path: '/mocs-client',
            component: Home,
            layout: Main,
            exact: true,
            name: 'Home Page',
            //   route: private,
        },
        {
            path: '/login',
            component: SignIn,
            layout: NoLayout,
            exact: true,
            name: 'Login Page',
        },
        {
            path: '/admin/management-business',
            component: Business,
            layout: Main,
            exact: true,
            name: 'Admin Page',
        },
        {
            path: '/admin/management-staff',
            component: Personnel,
            layout: Main,
            exact: true,
            name: 'Management Staff Page',
        },
        {
            path: '/profile/:id',
            component: Profile,
            layout: Main,
            exact: true,
            name: 'Profile Page',
        },
        // {
        //     path: '*',
        //     component: () => (
        //         <div>
        //             <h1>Page not found</h1>
        //         </div>
        //     ),
        //     layout: NoLayout,
        //     name: 'Page Not Found',
        // },
    ]

    return (
        <Suspense
            fallback={
                location.pathname !== '/login' && (
                    <div className='loading'>
                        <ScaleLoader
                            loading={true}
                            css={override}
                            color={'#001529'}
                        />
                        {/* ...loading */}
                    </div>
                )
            }
        >
            <Switch>
                {routes.map((item, key) => (
                    <RouteWithLayout
                        key={key}
                        name={item.name}
                        layout={item.layout}
                        component={item.component}
                        exact={item.exact}
                        path={item.path}
                    />
                ))}
            </Switch>
        </Suspense>
    )
}

export default Routes
