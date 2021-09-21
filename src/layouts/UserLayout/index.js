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
} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { NavLink } from 'react-router-dom'
const UserLayout = (props) => {
    const { children, isHeader, titleHeader } = props

    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            {/* HEADER */}
            {isHeader && (
                <>
                    <HideOnScroll {...props}>
                        <AppBar>
                            <Toolbar className='header'>
                                <Grid container alignItems='center' xs={3}>
                                    <NavLink
                                        to='/users/3'
                                        className='header__wrap-icon'
                                    >
                                        <KeyboardBackspaceIcon className='header__icon-back' />
                                    </NavLink>
                                </Grid>
                                <Grid container justifyContent='center' xs={6}>
                                    <Typography variant='h6' component='div'>
                                        {titleHeader}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}></Grid>
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
            <Footer />
        </Box>
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
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
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
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}
