import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
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
import {
    Star,
    Favorite,
    ThumbUp,
    ThumbDownAlt,
    ShoppingCart,
} from '@mui/icons-material'

const DetailFood = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
    }
    return (
        <div className='detail-food'>
            <div className='slider-food'>
                <Slider {...settings}>
                    <div>
                        <div
                            className='img-slider'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        ></div>
                    </div>
                    <div>
                        <div
                            className='img-slider'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        ></div>
                    </div>
                    <div>
                        <div
                            className='img-slider'
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pexels-christel-jensen-628776.jpg)`,
                            }}
                        ></div>
                    </div>
                </Slider>
            </div>
            <Grid className='info-food' container>
                <Grid item xs={6}>
                    <h2>Shusi Kinamoto</h2>
                    <div className='icon-rank'>
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>
                    <div className='icon-feedback'>
                        <Favorite className='item' />
                        <ThumbUp className='item' />
                        <ThumbDownAlt className='item' />
                    </div>
                </Grid>
                <Grid className='price-food' item xs={6}>
                    <div className='price'>
                        <h2>$8</h2>
                        <span>/combo</span>
                    </div>
                    <div className='count'>
                        <div>-</div>
                        <div>0</div>
                        <div>+</div>
                    </div>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid item xs={6}></Grid>
                <Grid container xs={6} direction='row' justifyContent='flex-end'>
                    <Button
                        className='btn btn--primary'
                        variant='contained'
                        startIcon={<ShoppingCart />}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>
            <Grid className='description' mt={2}>
                <div>this is description</div>
            </Grid>
        </div>
    )
}
DetailFood.propTypes = {}

export default DetailFood
