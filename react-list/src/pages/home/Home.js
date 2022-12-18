import './Home.css';
import { Paper, Container } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import {useEffect, useState} from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


export default function Home(){
    const [datas, setDatas] = useState(null);
    const [select, setSelect] = useState([]);
    const config = {
        method: 'get',
        url: 'https://assignment-api.piton.com.tr/api/v1/product/all',
        headers: {
            'accept': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsImlhdCI6MTY0OTg2MDExMiwiZXhwIjoxNjc1NzgwMTEyfQ.z8XYELsP1GBKkGpyvI14WzJKQAAbtQUwCl3hlLs_U4M'
        },
        data : ''
    };
    useEffect(()=>{
        axios(config)
            .then(function (response) {
                setDatas(response.data.products);
            })
            .catch(function (error) {
                console.log(error);
            });

    },[]);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    function addLikes(id){
            var myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsImlhdCI6MTY0OTg2MDExMiwiZXhwIjoxNjc1NzgwMTEyfQ.z8XYELsP1GBKkGpyvI14WzJKQAAbtQUwCl3hlLs_U4M");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "productId": id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://assignment-api.piton.com.tr/api/v1/product/like", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if(JSON.parse(result).status === "Success"){
                        if(!select.includes(id)){
                            setSelect(current => [...current, id]);
                        }
                        console.log(select)
                    }
                })
                .catch(error => console.log('error', error));

    }
    return(
        <Container sx={{mt:12}}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Item className="text-position">Name</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item className="text-position">Price</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item className="text-position">Image</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item className="text-position">TimeStamp</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item className="text-position">Description</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item className="text-position">Likes</Item>
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>

            <div>
                {datas && datas.map((obj)=>(
                    <Grid container spacing={2} sx={{ my: 0 }} key={obj.id}>
                        <Grid item xs={2}  >
                            <div className="table-body">{obj.name}</div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="table-body">{obj.price}</div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="table-body">{obj.image}</div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="table-body">{obj.timeStamp}</div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="table-body">{obj.description}</div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="table-body">{obj.likes}</div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="table-body">
                                <GradeIcon style={{ color: select.includes(obj.id )? "#ffd700" : "#b9b1b1"}} onClick={() => addLikes(obj.id)} color="primary" />
                            </div>
                        </Grid>
                    </Grid>
                ))}


            </div>

        </Container>


    )
}