import React, { useMemo, useState } from 'react'
import './style.scss'

import { Grid, Card, CardContent, CardMedia } from '@mui/material'
import { LocalOffer } from '@mui/icons-material'
import Slider from 'react-slick'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    HandleConvertURLImage,
    HandleSessionsOfDay,
} from 'common/HandleConvertURLImage'
import { HandleShowCharFirstName } from 'common/HandleFormat'
import { LIST_CATEGORY } from 'constants/index'
const Users = (props) => {
    const listEvent = useSelector((state) => state.home.listEvent)
    const profile = useSelector((state) => state.user.profile)
    const listMenu = useSelector((state) => state.home.listMenu)

    const [currentCategory, setCurrentCategory] = useState('food')

    const settings = {
        dots: true,
        className: 'padding-block',
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
    }
    const settingsCategory = {
        dots: true,
        className: 'padding-block',
        infinite: true,
        slidesToShow: 2,
        speed: 500,
    }

    const handleSelectCategory = (category) => {
        if (!category) return
        category = category.trim().toLowerCase()
        setCurrentCategory(category)
    }

    const filterListMenuByCategory = () => {
        let result = []
        if (!listMenu) return result
        result = listMenu.filter((e) => e.category === currentCategory)
        console.log(
            '🚀 ~ file: index.js ~ line 48 ~ filterListMenuByCategory ~ result',
            result
        )
        return result
    }

    const listMenuFilterByCategory = useMemo(
        () => filterListMenuByCategory(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentCategory]
    )

    return (
        <div className='home-user-page'>
            <Grid container>
                <Grid item xs={8}>
                    <div>
                        <h3>{HandleSessionsOfDay()}</h3>
                        <h2 className='name'>{profile.name}</h2>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={4}
                    justifyContent='flex-end'
                    alignItems='flex-end'
                    style={{ display: 'flex', marginBottom: '15px' }}
                >
                    <div className='avatar'>
                        {HandleShowCharFirstName(profile.name)}
                    </div>
                </Grid>
            </Grid>
            <div className='slider'>
                <Slider {...settings}>
                    {listEvent?.length &&
                        listEvent.map((e, keys) => (
                            <div key={keys}>
                                <div
                                    className='block-slider'
                                    style={{
                                        backgroundImage: `url(${HandleConvertURLImage(
                                            e.url_image
                                        )})`,
                                    }}
                                >
                                    <div className='bg-black'></div>
                                    <h2 className='title'>{e.name}</h2>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <h2 className='title-bestseller'>Category</h2>
            <div className='slider-category'>
                <Slider {...settingsCategory}>
                    {LIST_CATEGORY?.length &&
                        LIST_CATEGORY?.map((e, keys) => (
                            <div key={keys}>
                                <div
                                    onClick={() => {
                                        handleSelectCategory(e.category)
                                    }}
                                    className='category'
                                    style={{
                                        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${e.image})`,
                                    }}
                                >
                                    <div className='bg-black'></div>
                                    <h3 className='title-category'>{e.title}</h3>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <h2 className='title-bestseller'>Menu</h2>
                </Grid>
                {listMenuFilterByCategory?.map((e, keys) => (
                    <Grid key={keys} item xs={6}>
                        <NavLink to={`/users/food-detail/${e.id}`}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component='img'
                                    height='140'
                                    src={`${
                                        process.env.REACT_APP_API_SERVER +
                                        e.url_image
                                    }`}
                                    alt='green iguana'
                                />
                                <CardContent className='card-food'>
                                    <h3 className='title'>{e.name}</h3>
                                    <p>{e.description_short_food}</p>
                                    <h3 className='price'>
                                        <LocalOffer
                                            className='icon-price'
                                            fontSize='small'
                                        />
                                        ${e.price}
                                    </h3>
                                </CardContent>
                            </Card>
                        </NavLink>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Users
