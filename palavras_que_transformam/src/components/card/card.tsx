import { Card, CardActionArea, CardContent, IconButton, Theme, Typography, useMediaQuery } from "@mui/material"
import FormDialog from "../../pages/workspace/form.dialog"
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { dateAndHour } from "../date.and.hour/date";
import { Text } from "../../store/application/model/text"
import wordCounter from "../../store/application/utils/word.counter";
import { DeleteOutline } from "@mui/icons-material";
import * as TextActions from '../../store/duck/texts'
import { loadUserRequest } from "../../store/duck/users"
import { IActionTextId } from "../../store/duck/texts/types";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        color: `${theme.palette.primary.contrastText}`,
        backgroundColor: `${theme.palette.background.paper}`,

        [theme.breakpoints.up('md')]: {
            // backgroundColor: 'pink',

        },
        [theme.breakpoints.up('sm')]: {
            // backgroundColor: 'green',
        },

    },
    text: {
        color: `${theme.palette.primary.contrastText}`,
    },
    icon: {
        position: "fixed",
        justifySelf: "flex-end",
        left: "80%",
        top: "-140px"
    }
}))

interface IProps {
    readonly text: Text
    handleClickOpen(): void
    findTextRequest(data: IActionTextId): void
    removeTextRequest(data: IActionTextId): void
}
const TextCard = (props: IProps) => {
    const {
        text,
        findTextRequest,
        removeTextRequest
    } = props
    const classes = useStyles()

    const matchesSm = useMediaQuery('(min-width:400px)')
    return <Card
        sx={matchesSm ? { height: 150, width: 220 } : undefined}
        onClick={() => {
            text.id && findTextRequest({ textId: text.id })
            props.handleClickOpen()
        }}  /*className={classes.card}*/>

        <CardActionArea
            sx={matchesSm ? { height: 150 } : undefined}
        >

            <CardContent>
                <Typography
                    variant="h6"
                    sx={{ fontSize: 14 }}
                    className={classes.text}
                    gutterBottom>
                    Titulo
                </Typography>

                <Typography
                    variant="h5"
                    component="div"
                    className={classes.text}
                    noWrap>
                    {text?.title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ fontSize: 10, bottom: 0, right: 0 }}
                    align="right"
                    className={classes.text}
                >
                    {wordCounter(text?.body)} palavras escritas
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ fontSize: 10, bottom: 0, right: 0 }}
                    align="right"
                    className={classes.text}>
                    {dateAndHour(text?.update_at)}
                </Typography>

            </CardContent>
        </CardActionArea>
    </Card >
}
export default TextCard