import React, { useMemo } from 'react'
import './style.scss'
import {
    Grid,
    Box,
    Card,
    CardMedia,
    CardContent,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Stars, LocalOffer } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { HandleConvertPoint, HandleShowCharFirstName } from 'common/HandleFormat'
import { staffAPI } from 'api/staffs'
import { Notify } from 'components/Notify'
import { HandleConvertURLImage } from 'common/HandleConvertURLImage'
import { emitClient } from 'services/SocketIO/EmitServer'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}))

const ProfileClient = () => {
    const profile = useSelector((state) => state.user.profile)
    const listMenu = useSelector((state) => state.home.listMenu)
    const [open, setOpen] = React.useState(false)
    const [formUpdateProfile, setFormUpdateProfile] = React.useState({})

    const favoriteFoodList = () => {
        if (!profile?.feedback?.heart) return []
        const listIDFood = profile.feedback.heart
        const listFavoriteFood = []
        listIDFood.forEach((e) => {
            const itemFood = listMenu.find((food) => food.id === e.id)
            if (itemFood) {
                listFavoriteFood.push(itemFood)
            }
        })
        return listFavoriteFood
    }

    const handleClickOpen = () => {
        setOpen(true)
        setFormUpdateProfile({
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            avatar: profile.avatar,
            position: profile.position,
            username: profile.username,
        })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickUpdateProfile = async () => {
        const res = await staffAPI.updateStaff(formUpdateProfile)
        if (res?.status) {
            Notify(
                'success',
                'Success',
                'User was updated successfully',
                'bottomRight'
            )
            emitClient.getProfile(profile.id)
        } else {
            Notify('error', 'Error', 'User was updated fail', 'bottomRight')
        }
        setOpen(false)
    }

    const handleFillFormUpdate = (e) => {
        let { name, value } = e.target
        if (name === 'avatar') {
            value = e.target.files[0]
        }
        console.log(name, value)
        setFormUpdateProfile({ ...formUpdateProfile, [name]: value })
    }

    const favoriteList = useMemo(
        () => favoriteFoodList(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [profile?.feedback?.heart]
    )

    const objPoint = HandleConvertPoint(profile?.point)

    return (
        <Grid className='profile-client' container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        value={formUpdateProfile.name}
                        name='name'
                        margin='dense'
                        id='name'
                        label='Full Name'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleFillFormUpdate}
                    />
                    <TextField
                        value={formUpdateProfile.phone}
                        name='phone'
                        margin='dense'
                        id='phone'
                        label='Phone'
                        type='number'
                        fullWidth
                        variant='standard'
                        onChange={handleFillFormUpdate}
                    />
                    <TextField
                        style={{ marginBottom: '16px' }}
                        value={formUpdateProfile?.email}
                        name='email'
                        margin='dense'
                        id='email'
                        label='Email'
                        type='email'
                        fullWidth
                        variant='standard'
                        onChange={handleFillFormUpdate}
                    />
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        Upload Image
                    </label>
                    <input
                        id='file-upload'
                        name='avatar'
                        type='file'
                        onChange={(e) => {
                            handleFillFormUpdate(e)
                        }}
                    />
                    {typeof formUpdateProfile?.avatar === 'string' ? (
                        <div
                            className='bg-image-menu'
                            style={{
                                backgroundImage: `url(${HandleConvertURLImage(
                                    formUpdateProfile?.avatar
                                )})`,
                            }}
                        ></div>
                    ) : (
                        <div>{formUpdateProfile?.avatar?.name}</div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickUpdateProfile}>Update</Button>
                </DialogActions>
            </Dialog>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                direction='column'
                xs={12}
                py={2}
            >
                <div className='avatar-circle' onClick={handleClickOpen}>
                    {HandleShowCharFirstName(profile?.name)}
                </div>
                <h4 className='point'>
                    {profile?.point || 0}
                    <span> Point</span>
                </h4>
                <h1 className='title-name'>
                    {profile.name}{' '}
                    <span>
                        <Stars style={{ color: `${objPoint.colorMin}` }} />
                    </span>
                </h1>
            </Grid>
            <Grid
                container
                xs={12}
                pt={3}
                justifyContent='space-between'
                alignItems='center'
            >
                <Grid item xs={12}>
                    <h2 className='title-bestseller'>Level Member</h2>
                </Grid>
                <Stars style={{ color: `${objPoint.colorMin}` }} />
                <Box sx={{ height: 'fit-content', width: '80%' }}>
                    <BorderLinearProgress
                        variant='determinate'
                        value={objPoint.valueBar || 0}
                    />
                </Box>
                <Stars style={{ color: `${objPoint.colorMax}` }} />
            </Grid>
            <Grid container xs={12} justifyContent='space-between'>
                <h4>{objPoint.min}</h4>
                <h4>{objPoint.max}</h4>
            </Grid>

            <Grid
                container
                xs={12}
                pt={6}
                rowSpacing={2}
                columnSpacing={{ xs: 2, sm: 2, md: 3 }}
            >
                <Grid item xs={12}>
                    <h2 className='title-bestseller'>Favorite Food</h2>
                </Grid>
                {favoriteList &&
                    favoriteList?.map((e, key) => (
                        <Grid key={key} item xs={6}>
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
        </Grid>
    )
}

export default ProfileClient
