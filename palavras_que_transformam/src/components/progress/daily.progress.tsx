import {
    Grid2 as Grid,
    Theme,
    Tooltip,
    useTheme
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import {User} from "../../store/application/model/user"
import {Text} from "../../store/application/model/text"
import moment from "moment"
import { useAppThemeContext } from "../theme/context"
import React, { useEffect, useContext } from "react"
import { AuthContext } from "../auth/AuthContext"

const useStyles = makeStyles((theme: Theme) => ({
    background: {
        backgroundColor: `${theme.palette.background.default}`,
        width: "16px",
        height: "16px",
        margin: "1px",
        borderRadius: "5px"
    },
}))
interface IProps {
    readonly texts: Text[]

    loadTextRequest(data:{userId: string}): void
}
const DailyProgress = (props: IProps) => {
    const auth = useContext(AuthContext)
    const { themeName, toggleTheme } = useAppThemeContext()
    const theme = useTheme()
    const classes = useStyles()
    const { texts,loadTextRequest } = props
    const days: number = 365

    useEffect(() => {
        if (auth.user?.id) {
            loadTextRequest({userId: auth.user.id})
        }
    }, [])

    const mapTxtGoal = (texts: Text[], day: string) => {
        const validation = texts.some((text: Text) => {

            if (text.update_at) {
                let update = moment(text.update_at).format('DD/MM/YYYY')

                if (update === day && text.achieved_goal === true) {
                    return true
                }
            }
        })

        return validation
    }
    const colorFuture = (name: string) => {
        let color: string = ""
        if (name === "dark") {
            color = "#4F4F4F"
        }
        else {
            color = "#e7e7e7"
        }
        return color
    }
    return <Grid container>
        {
            Array.from({ length: days }).map((_, i) => {
                let currentDate = moment().dayOfYear(i).format('DD/MM/YYYY')
                return <Grid key={i}>
                    <Tooltip title={`${currentDate}`} arrow>
                        <div key={i} className={classes.background} style={{ backgroundColor: mapTxtGoal(texts, currentDate) ? `${theme.palette.secondary.main}` : (moment().dayOfYear() > i ? colorFuture(themeName) : "") }}></div>
                    </Tooltip>
                </Grid>
            })
        }
    </Grid>
}
export default DailyProgress