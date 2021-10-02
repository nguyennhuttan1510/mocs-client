import React, { useMemo, useState } from 'react'
import Slider from 'react-slick'
import './style.scss'
import { Grid, Button, IconButton } from '@mui/material'
import {
    Star,
    Favorite,
    ThumbUp,
    ThumbDownAlt,
    ShoppingCart,
} from '@mui/icons-material'
import { HandleConvertURLImage } from 'common/HandleConvertURLImage'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { HandleAddFoodForTable } from 'common/HandleAddFoodForTable'
import { Notify } from 'components/Notify'
import { emitClient } from 'services/SocketIO/EmitServer'
const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
}
const DetailFood = (props) => {
    let { id } = useParams()
    const history = useHistory()
    const listMenu = useSelector((state) => state.home.listMenu)
    const tableDetail = useSelector((state) => state.cart.listFood)
    const profile = useSelector((state) => state.user.profile)
    // const IDTable = useSelector((state) => state.current.IDTable)
    const foodDetail = useMemo(() => {
        let result = {}
        if (!listMenu) return
        result = listMenu.find((e) => e.id === id)
        return result
    }, [listMenu, id])
    const [countFoods, setCountFoods] = useState(1)

    const ShowRank = () => {
        if (!foodDetail.feedback.rank) return
        let rank = []
        for (let index = 0; index < foodDetail.feedback.rank; index++) {
            rank.push(index)
        }
        rank = rank.map((element) => {
            return <Star fontSize='small' />
        })
        return rank
    }

    const handleClickAddToCart = () => {
        if (countFoods === 0) {
            Notify(
                'error',
                'Error',
                "Please, Let's choose the count of food ",
                'bottomRight'
            )
            return
        }
        if (!tableDetail) {
            history.push('/users/order', {
                foodDetail: foodDetail,
                roleUser: profile.position,
                countFoods: countFoods,
            })
            return
        }
        HandleAddFoodForTable(
            foodDetail,
            tableDetail.id,
            profile.position,
            countFoods
        )
        Notify('success', 'Success', 'Food has added', 'bottomRight')
    }

    const checkIsActive = (typeFeedBack) => {
        let isActive
        isActive = profile.feedback[typeFeedBack].some((e) => e.id === id)

        return isActive ? 'active' : ''
    }
    const handleSetFeedback = (typeFeedBack) => {
        const objFeedBack = {
            IDUser: profile.id,
            type: typeFeedBack,
            IDFood: id,
            dataFeedBack: {
                id: id,
                name: foodDetail.name,
            },
        }
        emitClient.setFeedBack(objFeedBack)
    }

    return (
        <div className='detail-food'>
            <div className='slider-food'>
                <Slider {...settings}>
                    <div>
                        <div
                            className='img-slider'
                            style={{
                                backgroundImage: `url(${HandleConvertURLImage(
                                    foodDetail.url_image
                                )})`,
                            }}
                        ></div>
                    </div>
                </Slider>
            </div>
            <Grid className='info-food' container>
                <Grid item xs={6}>
                    <h2>{foodDetail.name}</h2>
                    <div className='icon-rank'>{ShowRank()}</div>
                </Grid>
                <Grid
                    className='price-food'
                    item
                    xs={6}
                    container
                    direction='column'
                    alignItems='flex-end'
                >
                    <div className='price'>
                        <h2>${foodDetail.price}</h2>
                        <span>/combo</span>
                    </div>
                    <div className='count'>
                        <div
                            onClick={() => {
                                setCountFoods(countFoods - 1)
                            }}
                        >
                            -
                        </div>
                        <div>{countFoods}</div>
                        <div
                            onClick={() => {
                                setCountFoods(countFoods + 1)
                            }}
                        >
                            +
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid className='info-food' container mt={1} alignItems='center'>
                <Grid item xs={6}>
                    <div className='icon-feedback'>
                        <IconButton
                            className='btn-feedback'
                            onClick={() => {
                                handleSetFeedback('heart')
                            }}
                            aria-label='upload picture'
                            component='span'
                        >
                            <Favorite
                                className={`item heart ${checkIsActive('heart')}`}
                            />
                            <span className='count-feedback'>
                                {foodDetail.feedback.heart}
                            </span>
                        </IconButton>
                        <IconButton
                            className='btn-feedback'
                            onClick={() => {
                                handleSetFeedback('like')
                            }}
                            aria-label='upload picture'
                            component='span'
                        >
                            <ThumbUp
                                className={`item like ${checkIsActive('like')}`}
                            />
                            <span className='count-feedback'>
                                {foodDetail.feedback.like}
                            </span>
                        </IconButton>
                        <IconButton
                            className='btn-feedback'
                            onClick={() => {
                                handleSetFeedback('dislike')
                            }}
                            aria-label='upload picture'
                            component='span'
                        >
                            <ThumbDownAlt
                                className={`item dislike ${checkIsActive(
                                    'dislike'
                                )}`}
                            />
                            <span className='count-feedback'>
                                {foodDetail.feedback.dislike}
                            </span>
                        </IconButton>
                    </div>
                </Grid>
                <Grid container xs={6} direction='row' justifyContent='flex-end'>
                    <Button
                        className='btn btn--primary'
                        variant='contained'
                        startIcon={<ShoppingCart />}
                        onClick={() => {
                            handleClickAddToCart()
                        }}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>

            <Grid className='description' mt={2}>
                <h3>Description</h3>
                <div>{foodDetail.description_short_food}</div>
            </Grid>
        </div>
    )
}

export default DetailFood
