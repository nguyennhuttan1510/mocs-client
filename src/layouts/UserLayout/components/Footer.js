import React from 'react'
import {
    ShoppingCart,
    CardGiftcard,
    AccountCircle,
    Home,
    AddAlarm,
} from '@mui/icons-material'
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { LIST_PATH_NAVIGATION } from 'constants/index'

const Footer = (props) => {
    const { pathCurrent } = props
    const history = useHistory()
    const setCurrentNavigation = (event, tabKey) => {
        LIST_PATH_NAVIGATION.forEach((element) => {
            if (tabKey === element.index) {
                history.push(element.path)
            }
        })
    }
    const tabKeyCurrent = () => {
        const result = LIST_PATH_NAVIGATION.find((e) => e.path === pathCurrent)
        return result ? result.index : -1
    }
    return (
        <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={tabKeyCurrent()}
                onChange={setCurrentNavigation}
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
