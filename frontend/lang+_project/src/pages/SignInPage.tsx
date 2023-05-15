import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ILogin } from 'models';
import { useContext, useState } from 'react';
import { UserContext } from 'context/AuthContext';
import { useNavigate } from 'react-router';
import authApi from "api/authApi"

const theme = createTheme();

export function SignInPage() {
    const [button, setButton] = useState<string>("Войти")
    const [responseError, setResponseError] = useState<string>("")

    const navigate = useNavigate()

    const { setAuth } = useContext(UserContext)

    async function signInRequest({user, setButton, setResponseError} : { user: ILogin, setButton: (title: string) => void, setResponseError: (title: string) => void }) {
        await authApi
            .post(
                "auth/login", 
                user
            )
            .then(() => {
                setAuth(true)
                navigate("/")
            })
            .catch(error => {
                setResponseError(error.response.data)
                setButton("Войти")
            })
    } 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userInfo: ILogin = {
            login: data.get('email')?.toString()!!,
            password: data.get('password')?.toString()!!
        }

        setButton("Загрузка...")
        signInRequest({ user: userInfo, setButton, setResponseError })
    };

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
                Welcome
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username/email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
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