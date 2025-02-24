import {
    Box,
    Grid2 as Grid,
    Paper,
    Typography,
    useTheme
} from "@mui/material"
import CircularWithValueLabel from "../../components/progress/circular.progress.with.label"
import ProgressBar from "../../components/progress/line.progress"
import { dateFomart } from "../../components/date.and.hour/date";
import { Text } from "../../store/application/model/text"
import { useEffect, useState } from "react";

interface dashboardProps {
    readonly userName: string
    readonly texts: Text[]
    readonly point: number
}

const size: number = 80

const UserDasboard = ({
    userName,
    texts,
    point
}: dashboardProps) => {

    const theme = useTheme()

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
    const colorFont = theme.palette.getContrastText(theme.palette.background.paper)


    const [desirablePoint, setDesirablePoints] = useState<number>(100)
    const [level, setLevel] = useState<number>(0);

    useEffect(() => {
        setLevel(Math.floor(point / desirablePoint))
    }, [point])

    const currentPoints = point-(level*desirablePoint)
    return <Paper>
        <Grid container direction="row" minHeight={240} >
            <Grid size={{ sm: 3 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: "0  2%" }}>
                <CircularWithValueLabel progress={level} size={size} />
            </Grid>
            <Grid size={{ sm: 8 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: "0  2%" }}>
                <Typography color={colorFont}>{userName}</Typography>
                <ProgressBar value={currentPoints} />
                <Typography color={colorFont}>{currentPoints}/{desirablePoint}</Typography>

            </Grid>
            <Box sx={{ padding: "0  4%" }} >
                <Typography color={colorFont}>Textos produzidos: <a style={{ color: `${theme.palette.secondary.main}` }}>{texts.length}</a></Typography>
                <Typography color={colorFont}>Dias que escreveu (deste da criação): <a style={{ color: `${theme.palette.secondary.main}` }}>{daysWrote.size}</a></Typography>
                <Typography color={colorFont}>Dias com metas cumpridas: <a style={{ color: `${theme.palette.secondary.main}` }}>{daysComplete.size}</a></Typography>
            </Box>
        </Grid>
    </Paper>
}
export default UserDasboard