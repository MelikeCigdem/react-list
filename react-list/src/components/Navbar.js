import styles from './Navbar.module.css';
import AppBar  from '@mui/material/AppBar';
import Box  from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import Toolbar  from '@mui/material/Toolbar';
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useContext, useEffect} from "react";
import Context from "./Store";


export default function Navbar(){
    const {state, dispatch} = useContext(Context);
    useEffect(()=>{
        if(state) {
            console.log(state.userName + "---" + dispatch);
        }
    },[state])
    function logout(){
        localStorage.setItem("user-info",'');
        window.location.reload();
    }
    return(
        <Box sx={{flexGrow:1}}>
            <AppBar position='static' color='primary'>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{flexGrow:1}}>
                        <Link component='button' to='/' className={styles.link}>Harcama Takip App</Link>
                    </Typography>
                    {
                        !localStorage.getItem('user-info') &&
                        <>
                            <Button variant='outlined' color='inherit'>
                                <Link component='button' className={styles.link} to='/login'>GİRİŞ</Link>
                            </Button>
                            <Button variant='outlined' color='inherit' sx={{ml:5}}>
                                <Link component='button' className={styles.link} to='/signup'>ÜYE OL</Link>
                            </Button>
                        </>
                    }
                    {
                        localStorage.getItem('user-info') &&
                        <Button variant='outlined' color='inherit' onClick={logout} sx={{ml:5}}>
                            ÇIKIŞ
                        </Button>
                    }



                </Toolbar>
            </AppBar>
        </Box>
    )
}