import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import {
    Grid,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material'
import { LocalOffer } from '@mui/icons-material'
import Slider from 'react-slick'
import { NavLink } from 'react-router-dom'
const Users = (props) => {
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
        // centerMode: true,
        infinite: true,
        slidesToShow: 2,
        speed: 500,
    }

    return (
        <div className='home-user-page'>
            <Grid container>
                <Grid item xs={8}>
                    <div>
                        <h4>Good Morning</h4>
                        <h2 className='name'>Nguyen Nhut Tan</h2>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={4}
                    justifyContent='flex-end'
                    alignItems='flex-end'
                    style={{ display: 'flex', marginBottom: '15px' }}
                >
                    <div className='avatar'></div>
                </Grid>
            </Grid>
            <div className='slider'>
                <Slider {...settings}>
                    <div>
                        <div
                            className='block-slider'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        >
                            <div className='bg-black'></div>
                            <h2 className='title'>Monday Off 40%</h2>
                        </div>
                    </div>
                    <div>
                        <div
                            className='block-slider'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        >
                            <div className='bg-black'></div>
                            <h2 className='title'>Saturday Off 40%</h2>
                        </div>
                    </div>
                    <div>
                        <div
                            className='block-slider'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        >
                            <div className='bg-black'></div>
                            <h2 className='title'>Sunday Off 40%</h2>
                        </div>
                    </div>
                </Slider>
            </div>
            <h2 className='title-bestseller'>Category</h2>
            <div className='slider-category'>
                <Slider {...settingsCategory}>
                    <div>
                        <div
                            className='category'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        >
                            <div className='bg-black'></div>
                            <h3 className='title-category'>Sunday Off 40%</h3>
                        </div>
                    </div>
                    <div>
                        <div
                            className='category'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        >
                            <div className='bg-black'></div>
                            <h3 className='title-category'>Sunday Off 40%</h3>
                        </div>
                    </div>
                    <div>
                        <div
                            className='category'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        >
                            <div className='bg-black'></div>
                            <h3 className='title-category'>Sunday Off 40%</h3>
                        </div>
                    </div>
                </Slider>
            </div>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <h2 className='title-bestseller'>Bestseller</h2>
                </Grid>
                <Grid item xs={6}>
                    <NavLink to='/users/food-detail/1'>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component='img'
                                height='140'
                                src={`${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg`}
                                alt='green iguana'
                            />
                            <CardContent className='card-food'>
                                <h3 className='title'>Shusi Kinamoto</h3>
                                <p>Lizards are a wide spread</p>
                                <h3 className='price'>
                                    <LocalOffer className='icon-price' />
                                    $8
                                </h3>
                            </CardContent>
                            {/* <CardActions>
                            <Button size='small'>Share</Button>
                            <Button size='small'>Learn More</Button>
                        </CardActions> */}
                        </Card>
                    </NavLink>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component='img'
                            height='140'
                            src={`${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg`}
                            alt='green iguana'
                        />
                        <CardContent className='card-food'>
                            <h3 className='title'>Shusi Kinamoto</h3>
                            <p>Lizards are a wide spread</p>
                            <h3 className='price'>
                                <LocalOffer className='icon-price' />
                                $8
                            </h3>
                        </CardContent>
                        {/* <CardActions>
                            <Button size='small'>Share</Button>
                            <Button size='small'>Learn More</Button>
                        </CardActions> */}
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component='img'
                            height='140'
                            src={`${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg`}
                            alt='green iguana'
                        />
                        <CardContent className='card-food'>
                            <h3 className='title'>Shusi Kinamoto</h3>
                            <p>Lizards are a wide spread</p>
                            <h3 className='price'>
                                <LocalOffer className='icon-price' />
                                $8
                            </h3>
                        </CardContent>
                        {/* <CardActions>
                            <Button size='small'>Share</Button>
                            <Button size='small'>Learn More</Button>
                        </CardActions> */}
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component='img'
                            height='140'
                            src={`${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg`}
                            alt='green iguana'
                        />
                        <CardContent className='card-food'>
                            <h3 className='title'>Shusi Kinamoto</h3>
                            <p>Lizards are a wide spread</p>
                            <h3 className='price'>
                                <LocalOffer className='icon-price' />
                                $8
                            </h3>
                        </CardContent>
                        {/* <CardActions>
                            <Button size='small'>Share</Button>
                            <Button size='small'>Learn More</Button>
                        </CardActions> */}
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component='img'
                            height='140'
                            src={`${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg`}
                            alt='green iguana'
                        />
                        <CardContent className='card-food'>
                            <h3 className='title'>Shusi Kinamoto</h3>
                            <p>Lizards are a wide spread</p>
                            <h3 className='price'>
                                <LocalOffer className='icon-price' />
                                $8
                            </h3>
                        </CardContent>
                        {/* <CardActions>
                            <Button size='small'>Share</Button>
                            <Button size='small'>Learn More</Button>
                        </CardActions> */}
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component='img'
                            height='140'
                            src={`${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg`}
                            alt='green iguana'
                        />
                        <CardContent className='card-food'>
                            <h3 className='title'>Shusi Kinamoto</h3>
                            <p>Lizards are a wide spread</p>
                            <h3 className='price'>
                                <LocalOffer className='icon-price' />
                                $8
                            </h3>
                        </CardContent>
                        {/* <CardActions>
                            <Button size='small'>Share</Button>
                            <Button size='small'>Learn More</Button>
                        </CardActions> */}
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

Users.propTypes = {}

export default Users
