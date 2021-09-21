import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List, ListItem, ListItemText, Divider, Button } from '@mui/material'
import './style.scss'

const ListOrder = (props) => {
    const LIST_ORDER = [1, 2, 3, 4, 5]
    const style = {
        width: '100%',
        // maxWidth: 360,
        bgcolor: 'background.paper',
    }
    return (
        <Grid container className='order-page'>
            <Grid item xs={12} mb={2}>
                <List sx={style} component='nav' aria-label='mailbox folders'>
                    {LIST_ORDER.map((e) => (
                        <>
                            <ListItem px={0}>
                                <ListItemText primary='Inbox' />
                                <div className='order__price'>$8</div>
                                <div className='order__count'>0</div>
                                <div className='order__action'>
                                    <div>-</div>
                                    <div>+</div>
                                </div>
                            </ListItem>
                            <Divider light />
                        </>
                    ))}
                    <ListItem px={0}>
                        <ListItemText primary='Total' />
                        <div className='order__price price--large'>$8</div>
                        <div className='order__count'>0</div>
                        <div className='order__action label'>Items</div>
                    </ListItem>
                </List>
            </Grid>
            <Grid container xs={12} justifyContent='flex-end'>
                <Button className='btn btn__primary' variant='outlined'>
                    View Progress
                </Button>
                <Button
                    className='btn btn--success order__button'
                    variant='contained'
                >
                    Order
                </Button>
            </Grid>
        </Grid>
    )
}

ListOrder.propTypes = {}

export default ListOrder
