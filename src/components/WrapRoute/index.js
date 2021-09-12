import React from 'react'
import PropTypes from 'prop-types'
const WrapRoute = ({ children }) => {
    return <>{children}</>
}

WrapRoute.propTypes = {
    children: PropTypes.element.isRequired,
}

export default WrapRoute
