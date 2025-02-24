import {
    Grid2 as Grid,
    Paper,
    Theme,
    Typography,
    useTheme
} from "@mui/material"
import { useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import DailyProgress from "../../components/progress/daily.progress";
import Rank from "../../components/table/rank";
import clsx from "clsx";
import { loadTextRequest } from '../../store/duck/texts'
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { AuthContext } from "../../components/auth/AuthContext";
import { useContext } from 'react'
import { AppDispatch, RootState } from "../../store/duck";
import { rankingUserRequest, rankingWeeklyRequest, rankingYearRequest } from "../../store/duck/ranking";
import UserDasboard from "./user.dashboard";


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
    infor: {
        color: `${theme.palette.primary.contrastText}`,
        fontSize: 10
    }
}))


const Statistic = () => {

    const classes = useStyles()
    const auth = useContext(AuthContext)
    const theme = useTheme()

    const user = useSelector((state: RootState) => state.users.create.user)
    const texts = useSelector((state: RootState) => state.texts.list.texts)
    const weeklyRanking = useSelector((state: RootState) => state.ranking.weekly.list)
    const YearsRanking = useSelector((state: RootState) => state.ranking.years.list)

    const dispatch = useDispatch<AppDispatch>()

    const colorFont = theme.palette.getContrastText(theme.palette.background.paper)

    useEffect(() => {
        if (auth.user?.id) {
            dispatch(loadTextRequest({ userId: auth.user.id }))
        }
    }, [])

    useEffect(() => {
        dispatch(rankingWeeklyRequest())
        dispatch(rankingYearRequest())
        dispatch(rankingUserRequest())
    }, [])



    return <Grid container className={classes.table} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Grid size={{ md: 5, xs: 12 }} className={classes.container} >
            <UserDasboard
                point={auth.user?.point || 0}
                userName={auth.user?.name || ""}
                texts={texts}
            />
        </Grid>

        <Grid size={{ md: 7, xs: 12 }} className={classes.container} >
            <Paper style={{ minHeight: "240px", alignItems: 'center', justifyContent: 'center', padding: "2%" }}>
                <Typography
                    align="center"
                    variant="h5"
                    color={colorFont} >Progressos diários de metas concluidas ({`${moment().year()}`})</Typography>
                <DailyProgress
                    texts={texts}
                    loadTextRequest={loadTextRequest}
                />
            </Paper>
        </Grid>
        <Grid size={{ sm: 12, xs: 12, md: 4 }} className={classes.container}>
            <Paper>
                <Typography
                    align="center"
                    color={colorFont}
                    p={2}
                >
                    Rank Semanal
                </Typography>
                <Rank users={weeklyRanking} />
            </Paper>
        </Grid>
        <Grid size={{ sm: 12, xs: 12, md: 4 }} className={classes.container}>
            <Paper>
                <Typography
                    align="center"
                    p={2}
                    color={colorFont}
                >
                    Rank Geral
                </Typography>
                <Rank users={YearsRanking} />
            </Paper>
        </Grid>
    </Grid>

}


export default Statistic