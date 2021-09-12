import React from 'react'

import './style.scss'

const NoLayout = (props) => {
    const { children } = props
    return <div className='nolayout'>{children}</div>
}

export default NoLayout
