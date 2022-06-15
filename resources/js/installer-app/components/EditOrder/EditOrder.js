import { Box, Button, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import TagIcon from '@mui/icons-material/Tag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Select from 'react-select';
import { FormControl } from '@mui/material';
import OrderService from '../../services/OrderService';
import LoadingSpinner from '../LoadingSpinner';
import UploadImages from '../../../components/UploadImages';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import './style.css'

import { toast } from 'react-toastify';

export const orderStatusList = [
    { value: 'pending', label: 'Pending ⏳' },
    { value: 'approved', label: 'Approved 👍🏻' },
    { value: 'cancled', label: 'Cancled ❌' },
    { value: 'on the way', label: 'On the way ✅' },
    { value: 'in process', label: 'In process ✅' },
    { value: 'last step to complete', label: 'Last step to complete ✅' },
    { value: 'done', label: 'Done ✅' },
    { value: 'completed', label: 'Completed ✅', isDisabled: true },
    { value: 'we are hit a traffic on the way', label: 'We are hit a traffic on the way 🚥' },
    { value: 'material is not there', label: 'Material is not there 🚫' },
    { value: 'can not access to start a job', label: 'Can not access to start a job 🔒' },
    { value: 'we received wrong job information', label: 'We received wrong job information 🚫' },
    { value: 'refunded', label: 'Refunded 🔁' }
];


const EditOrder = () => {
    const {orderId} = useParams();

    const [state, setState] = useState({
        status: null,
        order: null,
        loading: true,
    });

    useEffect(async () => {
        try {
            const result = await OrderService.getOrder(orderId);
            
            setState({
                loading: false,
                order: {
                    ...result.data,
                    status: orderStatusList.find(status => result.data.status === status.value)
                },
            });

        } catch (error) {
            
        }
    }, []);

    const handleUpdateOrder = async () => {
        const {data} = await OrderService.updateOrder(orderId, state.order.status.value);
        if (data.ok) {
            toast('Order successfully updated', {
                type: 'success'
            });
        }
    }

    if (state.loading) {
        return <AuthLayout><LoadingSpinner /></AuthLayout>
    }

    return (
        <AuthLayout>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <TagIcon /> <Typography variant='h6' sx={{fontSize: '20px'}}>UUID: {state.order.uuid}</Typography>
                    </Box>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Box >
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{fontWeight: 'bold'}}>Address:</Typography>
                        </Box>
                        <Typography variant='body2'>{state.order.address}</Typography>
                    </Box>
                </Grid>

                <Grid item md={6} xs={12} >
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <TagIcon /> <a target="_blank" href={`tel:${state.order.user.phone}`}>{state.order.user.phone} - {state.order.user.name}</a>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <LocationOnIcon /> <a target="_blank" href={`https://www.google.com/maps/search/${state.order.address}`}>Directions</a>
                    </Box>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Box >
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{fontWeight: 'bold'}}>Order notes:</Typography>
                        </Box>
                        <Typography variant='body2'>{state.order.notes}</Typography>
                    </Box>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Box >
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{fontWeight: 'bold'}}>Installer notes:</Typography>
                        </Box>
                        <Typography variant='body2'>{state.order?.installer_notes}</Typography>
                    </Box>
                </Grid>

                <Grid item md={6} xs={12} >
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Order status:</Typography>
                    </Box>
                    <Select
                        isSearchable={false}
                        // disabled
                        options={orderStatusList}
                        onChange={status => {
                            setState({
                                ...state,
                                order: {
                                    ...state.order,
                                    status
                                }
                            })
                        }}
                        value={state.order.status}
                    />

                    {['done', 'completed'].includes(state.order.status.value) && (
                        <UploadImages orderId={state.order.id} disableEditing={state.order.status.value === 'completed'} />
                    )}
                </Grid>

                <Grid item md={6} xs={12}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Note from installer:</Typography>
                    </Box>
                    <TextField  
                        sx={{width: '100%'}}
                        multiline
                        rows={5}
                        maxRows={6}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" endIcon={<SendRoundedIcon />} size="medium" onClick={handleUpdateOrder}>
                        Update order
                    </Button>
                </Grid>
            </Grid>
        </AuthLayout>
    )

}

export default EditOrder;