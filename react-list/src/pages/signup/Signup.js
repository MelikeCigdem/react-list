import './Signup.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/melike-%C3%A7i%C4%9Fdem-6461a91b5/">
                Your Linkedin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Signup(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email:'',
        password:'',
        userName:'',
        telephone:'',
        lastName:''
    })
    const handleChange = (prop) => (event)=>{
        setValues({...values,[prop]:event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": values.userName,
            "password": values.password,
            "email": values.email
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://assignment-api.piton.com.tr/api/v1/user/register", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result).token);
                if(JSON.parse(result).token){
                    navigate("/login");
                }
            })
            .catch(error => console.log('error', error));
    };
    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={handleChange('userName')}
                            value={values.userName}
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                        />
                        <TextField
                            onChange={handleChange('lastName')}
                            value={values.lastName}
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            mask='(+1) 999 999 9999'
                        />
                        <InputMask
                            mask="+90(999) 999 9999"
                            value={values.telephone}
                            onChange={handleChange('telephone')}
                        >
                            {() => <TextField
                                id="telephone"
                                label="Telephone"
                                name="telephone"
                                autoComplete="telephone"
                                margin="normal"
                                type="text"
                                fullWidth
                                required
                            />}
                        </InputMask>
                        <TextField
                            onChange={handleChange('email')}
                            value={values.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            onChange={handleChange('password')}
                            value={values.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button type="submit"fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign Up </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}