import {
    Avatar,
    Box,
    CircularProgress,
    Grid2 as Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Theme,
    Typography,
    useTheme
} from "@mui/material"
import MenuAppBar from "../../components/menu/menu.app.bar"
import * as React from 'react'
import CircularWithValueLabel from "../../components/progress/circular.progress.with.label";
import { makeStyles } from "@mui/styles";
import DailyProgress from "../../components/progress/daily.progress";
import ProgressBar from "../../components/progress/line.progress";
import Rank from "../../components/table/rank";
import clsx from "clsx";
import { User } from "../../store/application/model/user";
import { loadTextRequest } from '../../store/duck/texts'
import { findUserRequest, } from '../../store/duck/users'
import { connect, useDispatch, useSelector } from "react-redux";
import { Text } from "../../store/application/model/text"
import { dateFomart } from "../../components/date.and.hour/date";
import moment from "moment";
import { AuthContext } from "../../components/auth/AuthContext";
import { useContext } from 'react'
import { AppDispatch, RootState } from "../../store/duck";


const useStyles = makeStyles((theme: Theme) => ({
    background: {
        backgroundColor: `${theme.palette.background.default}`
    },
    table: {
        padding: "1%"
    },
    container: {
        padding: "5px"
    },
    text: {
        color: `${theme.palette.primary.contrastText}`,
    },
    infor: {
        color: `${theme.palette.primary.contrastText}`,
        fontSize: 10
    }
}))


const Statistic = () => {
    const theme = useTheme()
    const classes = useStyles()
    const auth = useContext(AuthContext)

    const user = useSelector((state: RootState) => state.users.create.user)
    const texts = useSelector((state: RootState) => state.texts.list.texts)

    const dispatch: AppDispatch = useDispatch()

    const [userData, setUserData] = React.useState<User | null>(user)
    const [progress, setProgress] = React.useState<number>(0)

    const [currentPoints, setCurrentPoints] = React.useState<number>(0)
    const [derisablePoints, setDerisablePoints] = React.useState<number>(1)
    const [users, setUsers] = React.useState<any[]>([
        { name: "Maria", points: 131231 },
        { name: "Jose", points: 13231 },
        { name: "Pedro", points: 11231 },
        { name: "Irlla", points: 11231 },
        { name: "Maria", points: 131231 },
        { name: "Jose", points: 13231 },
        { name: "Pedro", points: 11231 },
        { name: "Irlla", points: 11231 }
    ])

    const calcule = (value: number) => (((value / derisablePoints)) * 100)

    React.useEffect(() => {
        if (user?.id) {
            dispatch(findUserRequest({ userId: user.id }))
            setUserData(user)

            const value = user?.point || 0
            calcule(currentPoints)
            setProgress(value / 100)
            setCurrentPoints(value)
            setDerisablePoints(1000)
        }
    }, [])

    //  console.log("nv", progress, "I", currentPoints, "F", derisablePoints)
    const daysWrote = new Set<string>()
    texts.map((text: Text) => {
        daysWrote.add(dateFomart(text.update_at))
    })

    const daysComplete = new Set<string>()
    texts.map((text: Text) => {
        if (text.achieved_goal === true) {
            daysComplete.add(dateFomart(text.update_at))
        }
    })

    const size: number = 80
    const fontSizeInfo = 12
    return <div className={classes.background} >
        <MenuAppBar />
        <Grid container className={classes.table} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Grid size={{ md: 5,xs:12 }} className={classes.container} >
                <Paper>
                    <Grid container direction="row" minHeight={240} >
                        <Grid size={{ sm: 3 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: "0  2%" }}>
                            <CircularWithValueLabel progress={progress} size={size} />
                        </Grid>
                        <Grid size={{ sm: 8 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: "0  2%" }}>
                            <Typography className={classes.text}>{userData?.name}</Typography>
                            <ProgressBar value={calcule(currentPoints)} />
                            <Typography className={classes.text} sx={{ fontSize: fontSizeInfo }}>{currentPoints}/{derisablePoints}</Typography>

                        </Grid>
                        <Box sx={{ padding: "0  4%" }} >
                            <Typography className={classes.text} sx={{ fontSize: fontSizeInfo }}>Textos produzidos: <a style={{ color: `${theme.palette.secondary.main}` }}>{texts.length}</a></Typography>
                            <Typography className={classes.text} sx={{ fontSize: fontSizeInfo }}>Dias que escreveu (deste da criação): <a style={{ color: `${theme.palette.secondary.main}` }}>{daysWrote.size}</a></Typography>
                            <Typography className={classes.text} sx={{ fontSize: fontSizeInfo }}>Dias com metas cumpridas: <a style={{ color: `${theme.palette.secondary.main}` }}>{daysComplete.size}</a></Typography>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>

            <Grid size={{ md: 7,xs:12 }} className={classes.container} >
                <Paper style={{ minHeight: "240px", alignItems: 'center', justifyContent: 'center', padding: "2%" }}>
                    <Typography align="center" variant="h5" className={classes.text}>Progressos diários de metas concluidas ({`${moment().year()}`})</Typography>
                    <DailyProgress
                        texts={texts}
                        user={userData}
                        loadTextRequest={loadTextRequest}
                    />
                </Paper>
            </Grid>
            <Grid size={{ sm: 12 ,xs:12, md:4}} className={classes.container}>
                <Paper>
                    <Typography align="center" className={classes.text} p={2}>Rank Semanal</Typography>
                    <Rank users={users} />
                </Paper>
            </Grid>
            <Grid size={{ sm: 12,xs:12, md:4 }} className={classes.container}>
                <Paper>
                    <Typography align="center" className={classes.text} p={2}>Rank Geral</Typography>
                    <Rank users={users} />
                </Paper>
            </Grid>
        </Grid>
    </div>
}


export default Statistic