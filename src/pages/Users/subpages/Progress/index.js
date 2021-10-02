import React from 'react'
import { Grid, List, ListItem, ListItemText, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { constantFormat } from 'common/HandleFormat'
import './style.scss'
import { HandleSessionsOfDay } from 'common/HandleConvertURLImage'

const style = {
    width: '100%',
    bgcolor: 'background.paper',
}
const Progress = (props) => {
    const profile = useSelector((state) => state.user.profile)
    const listFood = useSelector((state) => state.cart.listFood)

    return (
        <Grid container className='bill-page'>
            {listFood ? (
                <>
                    <Grid item xs={12}>
                        <List
                            sx={style}
                            component='nav'
                            aria-label='mailbox folders'
                        >
                            {listFood?.menu?.map((e) => (
                                <>
                                    <ListItem px={0}>
                                        <Grid item xs={6}>
                                            <ListItemText primary='Inbox' />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <div className='order__price'>
                                                ${e.price}
                                            </div>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <div className='order__price'>
                                                x {e.count}
                                            </div>
                                        </Grid>
                                        <Grid
                                            container
                                            justifyContent='flex-end'
                                            xs={2}
                                        >
                                            <div className='order__count'>
                                                ${e.total}
                                            </div>
                                        </Grid>
                                    </ListItem>
                                    <Divider light />
                                </>
                            ))}
                        </List>
                    </Grid>
                    <Grid container xs={12} mt={2}>
                        <Grid
                            container
                            xs={12}
                            direction='row'
                            justifyContent='space-between'
                            alignItems='flex-end'
                        >
                            <h4>Total Price</h4>
                            <h2 style={{ marginBottom: ' 2px' }}>
                                ${listFood.total_cost}
                            </h2>
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            direction='row'
                            justifyContent='space-between'
                        >
                            <h4>Created at:</h4>
                            <h4>{constantFormat.Date(listFood.createdAt)}</h4>
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            direction='row'
                            justifyContent='space-between'
                        >
                            <h4>Payed at:</h4>
                            <h4>{constantFormat.Date(listFood?.payedAt)}</h4>
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            direction='row'
                            justifyContent='space-between'
                        >
                            <h4>Username:</h4>
                            <h4>{profile.name}</h4>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center' my={8}>
                        <h3>Thanks you have chosen SUAHAO !</h3>
                    </Grid>
                </>
            ) : (
                <Grid container justifyContent='center' xs={12} py={4}>
                    <div
                        className='bg-pay-bill'
                        style={{
                            backgroundImage: `url(${
                                process.env.PUBLIC_URL
                            }/assets/images/${
                                HandleSessionsOfDay() === 'Good Night'
                                    ? 'bg-paybill.png'
                                    : 'bg-paybill2.png'
                            })`,
                        }}
                    ></div>
                    <h2 style={{ textAlign: 'center', marginTop: '16px' }}>
                        {`Have A ${HandleSessionsOfDay()}`}
                    </h2>
                </Grid>
            )}
        </Grid>
    )
}

export default Progress
