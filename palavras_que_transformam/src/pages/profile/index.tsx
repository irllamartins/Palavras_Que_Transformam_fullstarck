import {
    Avatar,
    Box,
    Button,
    Grid2 as Grid,
    MenuItem,
    Paper,
    TextField,
    Theme,
    Typography
} from "@mui/material"
import React, { useContext, useState } from "react"
import MenuAppBar from "../../components/menu/menu.app.bar"
import { makeStyles } from "@mui/styles"
import clsx from "clsx";
import {User}from "../../store/application/model/user";
import { Dispatch, bindActionCreators } from "redux";
import { AppDispatch, IApplicationState } from "../../store/duck";
import { updateUserRequest } from '../../store/duck/users'
import { connect, useDispatch } from "react-redux";
import { AuthContext } from "../../components/auth/AuthContext";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        justifyContent: "space-around",
    },
    paper: {
        padding: "10% 10% 10% 10% ",
        textAlign: "center",
        justifyContent: "space-around",
    },
    text: {
        color: `${theme.palette.primary.contrastText}`,
        '& .MuiInputBase-root': {
            color: `${theme.palette.primary.contrastText}`
        },
        '& .MuiFormLabel-root': {
            color: `${theme.palette.primary.contrastText}`
        },
        '& .MuiButtonBase-root': {
            color: `${theme.palette.primary.contrastText}`
        }
    }
}))


const Profile = () => {

    const auth = useContext(AuthContext)

    const classes = useStyles()
   // const [userData, setUserData] = useState<User >(auth.user)
  
    const dispatch: AppDispatch = useDispatch()
    
    const [name, setName] = useState<string>("")
    const [goal, setGoal] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    React.useEffect(() => {
        if (auth.user) {
          //  setUserData(auth.user)
            setName(auth.user.name || "")
            setGoal(auth.user.goal || 0)
            setEmail(auth.user.email || "")
            setNewPassword(auth.user.password || "")
        }
    }, [auth.user])

    const update = (user: User) => {
        if (user.id) {
            dispatch(updateUserRequest({user:user}))
        }
    }

    const nameFormat = (value: string) => {
        const divide = value.split(' ')
        return `${divide[0][0]} ${divide[1] ? divide[1][0] : ""}`
    }
    const opcoes = [8, 500, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 5000]
    return  <Box sx={{ display: 'flex', height: '85vh', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container direction="row" className={classes.container}>
                <Grid container size={{sm:5}} >
                    <Paper className={clsx(classes.paper, classes.text)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar alt="Avatar" sx={{ bgcolor: "orange", width: "100px", height: "100px" }}>
                                {name && nameFormat(name)}
                            </Avatar>
                        </Box>
                        <Typography variant="h6" className={classes.text} >Seus dados</Typography>

                        <TextField
                            id="name"
                            label="Nome Completo"
                            fullWidth
                            variant="standard"
                            style={{ margin: "1% 0px 1% 0px " }}
                            value={name}
                            onChange={e => {
                                setName(e.target.value)
                            }} />
                        <TextField
                            id="email"
                            label="Email"
                            fullWidth
                            disabled={true}
                            style={{ margin: "1% 0px 1% 0px " }}
                            variant="standard"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }} />
                        <TextField
                            id="goal"
                            label="Meta de palavras escrita"
                            fullWidth
                            select={true}
                            variant="standard"
                            style={{ margin: "1% 0px 4% 0px " }}
                            value={goal}
                            onChange={e => {
                                setGoal(Number(e.target.value))
                            }}
                        >
                            {opcoes.map((item, index) =>
                                <MenuItem key={index} value={item} className={classes.text}>
                                    {item}
                                </MenuItem>)
                            }
                        </TextField>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ color: "white" }}
                            onClick={e => {
                                if (name && email) {
                                 /*   setUserData((prevUserData: User) => {
                                        const updateData = { ...prevUserData, name: name, goal: goal }
                                        update(updateData)
                                        return updateData
                                    })*/
                                }
                            }} >Modificar dados</Button>

                    </Paper>
                </Grid>
                <Grid size={{sm:5}} >
                    <Paper className={classes.paper}>
                        <Typography variant="h6" className={classes.text}>Configuração de senha</Typography>

                        <TextField
                            id="password"
                            error={error}
                            label="Redefinir senha"
                            fullWidth
                            type="password"
                            style={{ margin: "1% 0px 1% 0px " }}
                            variant="standard"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)} />

                        <TextField
                            id="passwordConfirm"
                            error={error}
                            label="Redefinir senha"
                            fullWidth
                            style={{ margin: "1% 0px 5% 0px " }}
                            type="password"
                            variant="standard"
                            value={newPasswordConfirm}
                            onChange={e => setNewPasswordConfirm(e.target.value)} />

                        <Button
                            fullWidth
                            variant="contained"
                            style={{ color: "white" }}
                            onClick={e => {
                                if (newPassword === newPasswordConfirm) {
                                    setError(false)
                                   /* setUserData((prevUserData: User) => {
                                        const updateData = { ...prevUserData, password: newPassword }
                                        update(updateData)
                                        return updateData
                                    })*/
                                } else {
                                    setError(true)
                                }
                            }}
                        >Modificar senha</Button>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
   
}

export default Profile