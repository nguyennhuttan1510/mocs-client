import React from 'react'
import PropTypes from 'prop-types'
import {
    ShoppingCart,
    CardGiftcard,
    AccountCircle,
    Home,
    AddAlarm,
} from '@mui/icons-material'
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Footer = (props) => {
    return (
        <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue)
                // }}
            >
                <BottomNavigationAction icon={<AccountCircle />} />
                <BottomNavigationAction icon={<CardGiftcard />} />
                <BottomNavigationAction icon={<Home />} />
                <BottomNavigationAction icon={<AddAlarm />} />
                <NavLink to='/users/order/3'>
                    <BottomNavigationAction icon={<ShoppingCart />} />
                </NavLink>
            </BottomNavigation>
        </Paper>
    )
}

Footer.propTypes = {}

export default Footer
