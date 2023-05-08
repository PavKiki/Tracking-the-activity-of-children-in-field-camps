import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IRegister } from 'models';
import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router';

const theme = createTheme();

export function SignUpPage() {

    const [redirect, setRedirect] = useState(false)
    const [button, setButton] = useState<string>("Зарегистрироваться")
    const [responseError, setResponseError] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        
        const userInfo: IRegister = {
            name: data.get('firstName')?.toString()!!,
            surname: data.get('lastName')?.toString()!!,
            username: data.get('username')?.toString()!!,
            email: data.get('email')?.toString()!!,
            password: data.get('password')?.toString()!!
        }

        setButton("Загрузка...")

        const response = await axios
            .post(
                "http://localhost:8080/api/v1/auth/register", 
                userInfo,
                {
                    withCredentials: true
                }
            )
            .then(
                () => setRedirect(true)
            )
            .catch(error => {
                setResponseError(error.response.data)
                setButton("Зарегистрироваться")
                return
            })
    };

    if (redirect) {
        return <Navigate to="/login"/>
    }

    return (
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
                Регистрация
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Имя"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Фамилия"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </Grid>
                </Grid>
                <Typography component="p" variant="subtitle1" color="red">
                    { responseError }
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    { button }
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}