import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory, Redirect } from 'react-router-dom'

const RouteWithLayout = (props) => {
    const {
        layout: Layout,
        component: Component,
        path,
        isHeader,
        name,
        ...rest
    } = props
    const history = useHistory()
    const profile = useSelector((state) => state.user.profile)

    useEffect(() => {
        const isLogin = Object.keys(profile).length === 0
        if (isLogin) {
            history.push('/login')
        }
    }, [profile])
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <Layout isHeader={isHeader} titleHeader={name} {...matchProps}>
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    )
}

export default RouteWithLayout
