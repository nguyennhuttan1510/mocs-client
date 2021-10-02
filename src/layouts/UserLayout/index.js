import React from 'react'
import PropTypes from 'prop-types'
import Footer from './components/Footer'
import 'App.scss'
import {
    Grid,
    Box,
    Toolbar,
    useScrollTrigger,
    Container,
    Slide,
    AppBar,
    Typography,
    CssBaseline,
    IconButton,
} from '@mui/material'
import { KeyboardBackspace, Logout } from '@mui/icons-material'
import { useHistory, useLocation } from 'react-router-dom'
import { CONSTANT } from 'stores/constants'
import { useDispatch } from 'react-redux'

const UserLayout = (props) => {
    const { children, isHeader, titleHeader, hasIconHeaderRight } = props
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    return (
        <Grid xs={12}>
            <Box sx={{ pb: 7 }}>
                <CssBaseline />
                {/* HEADER */}
                {isHeader && (
                    <>
                        <HideOnScroll {...props}>
                            <AppBar className='header'>
                                <Toolbar>
                                    <Grid container alignItems='center' xs={3}>
                                        <IconButton
                                            className='header__wrap-icon'
                                            onClick={() => {
                                                history.goBack()
                                            }}
                                            component='span'
                                        >
                                            <KeyboardBackspace className='header__icon-back' />
                                        </IconButton>
                                    </Grid>
                                    <Grid container justifyContent='center' xs={6}>
                                        <Typography variant='h6' component='div'>
                                            {titleHeader}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        alignItems='center'
                                        justifyContent='flex-end'
                                        xs={3}
                                    >
                                        {hasIconHeaderRight && (
                                            <Logout
                                                onClick={() => {
                                                    dispatch({
                                                        type: CONSTANT.ACTION_TYPE
                                                            .LOGOUT,
                                                    })
                                                }}
                                            />
                                        )}
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                        </HideOnScroll>
                        <Toolbar />
                    </>
                )}

                {/* CONTENT */}
                <Container>
                    <Box sx={{ my: 2 }}>{children}</Box>
                </Container>
                {/* FOOTER */}
                <Footer pathCurrent={location.pathname} />
            </Box>
        </Grid>
    )
}

UserLayout.propTypes = {}
UserLayout.defaultProps = {
    isHeader: false,
    titleHeader: '',
}
export default UserLayout

function HideOnScroll(props) {
    const { children, window } = props
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    })

    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
}
