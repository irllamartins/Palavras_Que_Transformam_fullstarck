
import {
    Carousel,
    CarouselItem,
} from 'react-bootstrap'
import {
    TextField,
    Grid2 as Grid,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    Theme,
    Container
} from '@mui/material'
import gato from "../../assert/gato-sem-fundo.png"
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { AppDispatch, RootState } from '../../store/duck'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../components/auth/AuthContext'
import { useContext } from "react"

import { createUserRequest } from '../../store/duck/users'
import { loadTextRequest } from '../../store/duck/texts'
const useStyles = makeStyles((theme: Theme) => ({
    fixed: {
        right: "10px",
        top: "180px",
        justifyContent: "stretch",
        alignContent: "center",
        position: "absolute",
    },
    paper: {
        padding: "4%",
        alignContent: "center",
        justifyItems: "space-between",
        backgroundColor: `${theme.palette.background.default}`
    },
    espacamento: {
        margin: " 3px 3px 0px 0px"
    },
    textfield: {
        padding: " 0px 0px 5px 5px",
        backgroundColor: "#f3f3"
    }
}))

enum Toggle {
    REGISTER = "register",
    LOGIN = "login"
}

const Register = () => {

    const classes = useStyles()
    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [toggle, setToggle] = React.useState<string>(Toggle.LOGIN);

    const auth = useContext(AuthContext)

    /*useEffect(() => {
        loadUserRequest()
    }, [])*/

    const items = [
        {
            src: 'https://via.placeholder.com/800x400.png?text=First+slide',
            altText: 'Slide 1',
        },
        {
            src: 'https://via.placeholder.com/800x400.png?text=Second+slide',
            altText: 'Slide 2',
        },
        {
            src: 'https://via.placeholder.com/800x400.png?text=Third+slide',
            altText: 'Slide 3',
        },
    ];
    const handleSubmit = async (email: string, password: string) => {

        if (email && password) {
            const isAuthenticated: boolean = await auth.signin(email, password)

            if (isAuthenticated) {
                // Navegamos para a página inicial se o usuário for autenticado
                auth.user?.id && dispatch(loadTextRequest({ userId: auth.user.id }))
                navigate('/workspace')
            }
            else {
                alert("Email e senha invalidos")
            }
        }

    }

    /* const loginUser = async () => {
        const { data } = await axiosInstance.post("/signin", {
            email, password
        }).then(response => {
            console.log(response.data);
            return response.data
        })
            .catch(error => {
                if (error.response) {
                    // A solicitação foi feita e o servidor respondeu com um código de status
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // A solicitação foi feita, mas nenhuma resposta foi recebida
                    console.log("nenhuma resposta foi recebida",error.request);
                } else {
                    // Algo aconteceu na configuração da solicitação que desencadeou um erro
                    console.log('Erro', error.message);
                }
            })

        if (data&&data.error) {
            console.log("login erro", data.error)
        } else {
            console.log("sucess")
        }
    }*/
    /* const registerUser = async () => {
         const { data } = await axiosInstance.post("/users", {
             name, email, password
         }).then(response => {
             console.log(response.data);
             return response.data
         })
             .catch(error => {
                 if (error.response) {
                     // A solicitação foi feita e o servidor respondeu com um código de status
                     console.log(error.response.data);
                     console.log(error.response.status);
                     console.log(error.response.headers);
                 } else if (error.request) {
                     // A solicitação foi feita, mas nenhuma resposta foi recebida
                     console.log("nenhuma resposta foi recebida",error.request);
                 } else {
                     // Algo aconteceu na configuração da solicitação que desencadeou um erro
                     console.log('Erro', error.message);
                 }
             })
 
         if (data.error) {
             console.log("register erro", data.error)
         } else {
             console.log("sucess")
         }
     }*/
    return <Grid container>
        <Grid size={{ sm: 9 }}>
            <Carousel controls={false} >
                {items.map((item, index) => (
                    <CarouselItem key={index}>
                        {/*<div className="vh-100">
                            <img src={item.src} alt={item.altText} className="w-100 h-100" />
                        </div>*/}
                        <Container>
                            <Typography>{index}</Typography>
                        </Container>
                    </CarouselItem>
                ))}
            </Carousel>
        </Grid>

        <Grid
            container
            size={{ sm: 3, md: 3, xs: 3 }}
            alignItems='center'
            justifyContent='center'
            sx={{  padding: "1%" }}
        >
            <Grid container direction="row" size={{ sm: 12 }}
                alignItems="center" justifyContent="center" >
                <Grid >
                    <img src={gato} width={100} height={100} />
                </Grid>
                <Grid >
                    <Typography variant='h5'>Palavras que </Typography>
                    <Typography variant='h5' >transformam</Typography>
                </Grid>
            </Grid>
            <Grid >
                <ToggleButtonGroup
                    size='small'
                    value={toggle}
                    exclusive
                    onChange={(event, option: string) => setToggle(option)}
                    aria-label="options"
                >
                    <ToggleButton
                        id={Toggle.LOGIN}
                        value={Toggle.LOGIN}
                        aria-label="login"
                    >
                        <Typography variant='button'>Login</Typography>
                    </ToggleButton>
                    <ToggleButton
                        id={Toggle.REGISTER}
                        value={Toggle.REGISTER}
                        aria-label="register"
                    >
                        <Typography variant='button'>Registrar</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            {
                toggle === Toggle.REGISTER ?
                    <Grid container size={{ sm: 12 }} >
                        <Grid size={{ sm: 12 }}>
                            <TextField
                                id="name"
                                variant='standard'
                                label={"Nome completo"}
                                fullWidth
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ sm: 12 }}>
                            <TextField
                                id="email"
                                variant='standard'
                                label={"Email"}
                                fullWidth
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ sm: 12 }}>
                            <TextField
                                id="password"
                                variant='standard'
                                type='password'
                                label={"Senha"}
                                fullWidth
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid> : <Grid container size={{ sm: 12 }}>

                        <Grid size={{ sm: 12 }}>
                            <TextField
                                id="email"
                                variant='standard'
                                label={"Email"}
                                fullWidth
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ sm: 12 }}>
                            <TextField
                                id="password"
                                variant='standard'
                                label={"Senha"}
                                type='password'
                                fullWidth
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>

            }

            <Grid size={{ sm: 12 }} className={classes.espacamento}>
                <Button
                    id="submit"
                    variant='contained'
                    fullWidth
                    sx={{ color: "white" }}
                    onClick={e => {
                        if (toggle === Toggle.REGISTER) {
                            if (name && email && password) {
                                dispatch(
                                    createUserRequest({
                                        user:
                                            { name: name, email: email, password: password }
                                    }
                                    ))
                                // registerUser()

                            }
                        }
                        else {
                            handleSubmit(email, password)
                            // loginUser()

                        }
                    }}>{toggle === Toggle.REGISTER ? "CADASTRE-SE" : "Fazer Login"}</Button>

            </Grid>

        </Grid>

    </Grid>

}


export default Register