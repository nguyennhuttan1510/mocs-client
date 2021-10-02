import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

const RouteWithLayout = (props) => {
    const {
        layout: Layout,
        component: Component,
        path,
        isHeader,
        name,
        hasIconHeaderRight,
        ...rest
    } = props
    const history = useHistory()
    const profile = useSelector((state) => state.user.profile)

    useEffect(() => {
        const isLogin = Object.keys(profile).length === 0
        if (isLogin) {
            history.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile])
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <Layout
                    isHeader={isHeader}
                    titleHeader={name}
                    hasIconHeaderRight={hasIconHeaderRight}
                    {...matchProps}
                >
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    )
}

RouteWithLayout.defaultProps = {
    hasIconHeaderRight: false,
    isHeader: false,
}

export default RouteWithLayout
