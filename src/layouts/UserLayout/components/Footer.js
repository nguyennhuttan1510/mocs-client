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
                <BottomNavigationAction icon={<ShoppingCart />} />
            </BottomNavigation>
        </Paper>
    )
}

Footer.propTypes = {}

export default Footer
