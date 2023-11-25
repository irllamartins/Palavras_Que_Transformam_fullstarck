import { Avatar, Box, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, useTheme } from "@mui/material"
import MenuAppBar from "../../components/menu/menu.app.bar"
import * as React from 'react'
import CircularWithValueLabel from "../../components/progress/circular.progress.with.label";
import { makeStyles } from "@mui/styles";
import DailyProgress from "../../components/progress/daily.progress";
import ProgressBar from "../../components/progress/line.progress";
import Rank from "../../components/table/rank";
import clsx from "clsx";
import User from "../../store/application/model/user";
import { IApplicationState } from "../../store";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as TextActions from '../../store/duck/text/actions'
import * as UserActions from '../../store/duck/user/actions'
import Text from "../../store/application/model/text"
import { dateFomart } from "../../components/date.and.hour/date";
import moment from "moment";
import { AuthContext } from "../../components/auth/AuthContext";
import { useEffect, useState, useContext } from 'react'

    
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

interface IPros {
    readonly texts: Text[]
    readonly user: User
    loadTextRequest(userId: string): void
    findUserRequest(userId: string): void
}

const Statistic = (props: IPros) => {
    const theme = useTheme()
    const classes = useStyles()
    const auth = useContext(AuthContext)
    const { user, texts, loadTextRequest ,findUserRequest} = props
    const [userData, setUserData] = React.useState<User>(new User().fromJSON(user.toJSON()))
    const [progress, setProgress] = React.useState<number>(0)
    const [currentPoints, setCurrentPoints] = React.useState<number>( 0)
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

    const calcule = (value:number) => (((value/derisablePoints))*100)

    React.useEffect(() => {
        if (auth.user?.id) {
            findUserRequest(auth.user?.id)
            setUserData(user)
            
            const value = user?.point || 0
            calcule(currentPoints)
            setProgress(value/100) 
            setCurrentPoints(value)
            setDerisablePoints(1000)  
        }
    }, [])

    console.log("nv",progress,"I",currentPoints,"F",derisablePoints)
    const daysWrote = new Set<string>()
    texts.map((text: Text) => {
        daysWrote.add(dateFomart(text.update_at))
    })

    const daysComplete = new Set<string>()
    texts.map((text: Text) => {
        if (text.goal === true) {
            daysComplete.add(dateFomart(text.update_at))
        }
    })

    const size: number = 80
    const fontSizeInfo = 12
    return <div className={classes.background} >
        <MenuAppBar />
        <Grid container className={classes.table} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Grid item sm={4} className={classes.container} >
                <Paper>
                    <Grid container direction="row" minHeight={240} >
                        <Grid item sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: "0  2%" }}>
                            <CircularWithValueLabel progress={progress} size={size} />
                        </Grid>
                        <Grid item sm={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: "0  2%" }}>
                            <Typography className={classes.text}>{userData.name}</Typography>
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

            <Grid item sm={7} className={classes.container} >
                <Paper style={{ minHeight: "240px", alignItems: 'center', justifyContent: 'center', padding: "2%" }}>
                    <Typography align="center" variant="h5" className={classes.text}>Progressos diários de metas concluidas ({`${moment().year()}`})</Typography>
                    <DailyProgress texts={texts} user={user} loadTextRequest={loadTextRequest} />
                </Paper>
            </Grid>{
           /* <Grid item sm={4} className={classes.container}>
                <Paper>
                    <Typography align="center" className={classes.text} p={2}>Rank Semanal</Typography>
                    <Rank users={users} />
                </Paper>
            </Grid>
            <Grid item sm={4} className={classes.container}>
                <Paper>
                    <Typography align="center" className={classes.text} p={2}>Rank Geral</Typography>
                    <Rank users={users} />
            </Paper>
</Grid>*/}
        </Grid>
    </div>
}
const mapStateToProps = (state: IApplicationState) => ({
    texts: state.text.list.texts,
    user: state.user.create.user
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...TextActions,
    ...UserActions

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Statistic)