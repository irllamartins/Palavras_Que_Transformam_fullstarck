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
import { makeStyles } from "@mui/styles"
import clsx from "clsx";
import { User } from "../../store/application/model/user";
import { AppDispatch } from "../../store/duck";
import { updateUserRequest } from '../../store/duck/users'
import {  useDispatch } from "react-redux";
import { AuthContext } from "../../components/auth/AuthContext";
import Achievement from "./achievement.stepper";


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: "5% 5% 5% 5% ",
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
            dispatch(updateUserRequest({ user: user }))
        }
    }

    const nameFormat = (value: string) => {
        const divide = value.split(' ')
        return `${divide[0][0]} ${divide[1] ? divide[1][0] : ""}`
    }
    const opcoes = [8, 500, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 5000]
    return <Box sx={{ display: 'flex', height: '85vh',justifyContent: 'center'}} >
        <Grid container spacing={2} direction="row"  /* */>
            <Grid container direction="column" spacing={2} size={{ lg: 4, md: 4, sm: 4, xs: 12 }} >
                <Grid   >
                    <Paper className={clsx(classes.paper, classes.text)}>
                        <Typography
                            variant="h6"
                            className={classes.text}
                            align="center"
                        >
                            Seus dados
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar alt="Avatar" sx={{ bgcolor: "orange", width: "50px", height: "50px" }}>
                                {name && nameFormat(name)}
                            </Avatar>
                        </Box>

                        <TextField
                            id="name"
                            label="Nome Completo"
                            fullWidth
                            size="small"
                            variant="standard"
                            style={{ margin: "1% 0px 1% 0px " }}
                            value={name}
                            onChange={e => {
                                setName(e.target.value)
                            }} />
                        <TextField
                            id="email"
                            label="Email"
                            size="small"
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
                            size="small"
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
                            size="small"
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
                <Grid >
                    <Paper className={clsx(classes.paper, classes.text)}>
                        <Typography variant="h6" className={classes.text}>Configuração de senha</Typography>

                        <TextField
                            id="password"
                            error={error}
                            size="small"
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
                            size="small"
                            style={{ margin: "1% 0px 5% 0px " }}
                            type="password"
                            variant="standard"
                            value={newPasswordConfirm}
                            onChange={e => setNewPasswordConfirm(e.target.value)} />

                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
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
            <Grid container justifyContent="stretch" size={{ lg: 8, md: 8, sm: 8, xs: 12 }}/**/ >
                <Paper className={clsx(classes.paper, classes.text)}   sx={{flexGrow: 1 /*,width:"50vw"*/}}>
                    <Achievement title="Minhas conquistas" achievements={auth.user?.achievements} />
                </Paper>
            </Grid>
        </Grid>
    </Box>

}

export default Profile