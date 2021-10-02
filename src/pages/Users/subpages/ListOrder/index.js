import React, { useRef, useState } from 'react'
import { Grid, List, ListItem, ListItemText, Divider, Button } from '@mui/material'
import './style.scss'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Notify } from 'components/Notify'
import { sumBy } from 'lodash-es'
import { HandleAddFoodForTable } from 'common/HandleAddFoodForTable'
import { emitTable } from 'services/SocketIO/EmitServer'
import QrReader from 'react-qr-reader'
import { currentState } from 'stores/reducers/current'

const ListOrder = (props) => {
    const history = useHistory()
    const tableDetail = useSelector((state) => state.cart.listFood)
    const profile = useSelector((state) => state.user.profile)
    let location = useLocation()
    let count = useRef(1)
    // const dispatch = useDispatch()

    // const [allowScan, setAllowScan] = useState(true)
    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    }

    const handleClickOrder = () => {
        emitTable.pushMenuToChef({
            IDTable: tableDetail.id,
            roleUser: profile.position,
        })
    }

    const handleClickPayBill = () => {
        emitTable.callPayBill(tableDetail.id)
        history.push('/users/bill')
    }

    const handleScan = async (data) => {
        if (data && count.current <= 2) {
            const convertQRCode = data.split('-')
            await emitTable.addTable({
                id: convertQRCode[0],
                name: convertQRCode[1],
                roleUser: profile.position,
                client: profile.id,
            })
            if (location.state?.foodDetail) {
                HandleAddFoodForTable(
                    location.state?.foodDetail,
                    convertQRCode[0],
                    location.state?.roleUser,
                    location.state?.countFoods
                )
                // Notify('success', 'Success', 'Food has added', 'bottomRight')
            }
            // Notify(
            //     'success',
            //     'Success',
            //     'You have chose the table successfully',
            //     'bottomRight'
            // )
            // setAllowScan(false)
            count.current = count.current + 1
        }
    }
    const handleError = (err) => {
        console.error(err)
    }

    return (
        <Grid container className='order-page'>
            {tableDetail ? (
                tableDetail?.menu?.length > 0 ? (
                    <>
                        <Grid item xs={12} mb={2}>
                            <List
                                sx={style}
                                component='nav'
                                aria-label='mailbox folders'
                            >
                                {tableDetail?.menu?.map((e) => (
                                    <>
                                        <ListItem px={0}>
                                            <ListItemText primary={e.name} />
                                            <div className='order__price'>
                                                ${e.total}
                                            </div>
                                            <div className='order__count'>
                                                {e.count}
                                            </div>
                                            <div className='order__action'>
                                                <div
                                                    onClick={() => {
                                                        if (e.count === 0) return
                                                        HandleAddFoodForTable(
                                                            e,
                                                            tableDetail.id,
                                                            profile.position,
                                                            -1
                                                        )
                                                    }}
                                                >
                                                    -
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        HandleAddFoodForTable(
                                                            e,
                                                            tableDetail.id,
                                                            profile.position,
                                                            1
                                                        )
                                                    }}
                                                >
                                                    +
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider light />
                                    </>
                                ))}
                                <ListItem px={0}>
                                    <ListItemText primary='Total' />
                                    <div className='order__price price--large'>
                                        ${sumBy(tableDetail.menu, 'total')}
                                    </div>
                                    <div className='order__count'>
                                        {sumBy(tableDetail.menu, 'count')}
                                    </div>
                                    <div className='order__action label'>Items</div>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid container xs={12} justifyContent='flex-end'>
                            {tableDetail.isMakeFood && (
                                <Button
                                    className='btn btn__primary'
                                    variant='outlined'
                                    onClick={() => {
                                        handleClickPayBill()
                                    }}
                                >
                                    Pay Bill
                                </Button>
                            )}

                            <Button
                                className='btn btn--success order__button'
                                variant='contained'
                                onClick={() => {
                                    handleClickOrder()
                                }}
                            >
                                Order
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <Grid container justifyContent='center' xs={12} py={4}>
                        <h2 style={{ textAlign: 'center' }}>
                            The dining table is set by
                            <br />
                            {profile.name}
                            <br />
                            let's order
                        </h2>
                        <Grid container justifyContent='center' xs={12}>
                            <Button className='btn btn__primary' variant='outlined'>
                                <Link to='/users'>Menu</Link>
                            </Button>
                        </Grid>
                    </Grid>
                )
            ) : (
                <Grid container xs={12} justifyContent='center' py={4}>
                    <h2 style={{ textAlign: 'center' }}>
                        Please, scan the QR code on the table to start ordering
                    </h2>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '80%' }}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default ListOrder
