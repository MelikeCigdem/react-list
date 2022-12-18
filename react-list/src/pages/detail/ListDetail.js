import {useParams} from 'react-router-dom';
import { useState} from "react";
import axios from "axios";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import './ListDetail.css'


const ListDetail = ()=>{
    const [detail,setDetail] = useState()
    const {id} = useParams();
    const config = {
        method: 'get',
        url:"https://assignment-api.piton.com.tr/api/v1/product/get/"+id,
        headers: {
            'accept': 'application/json',
            'access-token': JSON.parse(localStorage.getItem('user-info'))
        },
        data : ''
    };
    axios(config)
        .then(function (response) {
            setDetail(response.data.product);
        })
        .catch(function (error) {
            console.log(error);
        });

    return(
        <div>
            <Container sx={{mt:5}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8} className="product-img">
                            <img className="img"
                                src="//images02.nicepage.io/c461c07a441a5d220e8feb1a/6182b7ca64ef5420adeca8d9/35144535-8aaf-1bf7-89eb-153e47df0227.jpg"
                                loading="lazy"
                            />
                        </Grid>
                        <Grid item xs={8} className="product-datail">
                            <Typography variant="h3" component="h2" className="name">
                                {detail && detail.name}
                            </Typography>
                            <Typography variant="h5" component="h2" className="price">
                                {detail && detail.price}
                            </Typography>
                            <Typography variant="body1" gutterBottom className="description">
                                {detail && detail.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </div>
    )
}
export  default ListDetail;