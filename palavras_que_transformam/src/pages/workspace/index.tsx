import {
    Box,
    Button,
    Grid,
    IconButton,
    Theme,
    dialogActionsClasses,
    useMediaQuery
} from "@mui/material"
import React, { useEffect, useState, useContext } from 'react'
import MenuAppBar from "../../components/menu/menu.app.bar"
import TextCard from "../../components/card/card"
import ButtonSpeedDial from "../../components/button/button.speed.dial"
import { DefaultTheme, makeStyles, useTheme } from '@mui/styles'
import { url } from "inspector"
import { AppThemeProvider, useAppThemeContext } from "../../components/theme/context"
import { IApplicationState } from "../../store"
import { Dispatch, bindActionCreators } from "redux"
import * as TextActions from '../../store/duck/text/actions'
import { connect } from "react-redux"
import { IDialogState } from "../../store/duck/text/types"
import FormDialog from "./form.dialog"
import Text from "../../store/application/model/text"
import { AuthContext } from "../../components/auth/AuthContext"


const useStyles = makeStyles((theme: Theme) => ({
    backgound: {
        // backgroundImage:'url("https://img.freepik.com/fotos-gratis/texturas-de-madeira-velha_74190-5512.jpg?size=626&ext=jpg")',
        // backgroundImage:'url("https://totalhardwareja.com/cdn/shop/products/Prisma-Blue-HD-52110-ok-FACE-1_666x387.jpg?v=1652823897")',
        //backgroundImage:'url("https://images.hdqwalls.com/download/minimalist-landscape-to-2932x2932.jpg")',
        //backgroundImage:'url("https://i.pinimg.com/236x/33/0c/6d/330c6d5c2b49ce231d44e0cf691be571.jpg?nii=t")',
        //backgroundImage:'url("https://wallup.net/wp-content/uploads/2016/03/12/161242-simple_background-minimalism-cat-drawing-animals-sitting-blue_background.jpg")',
        /* backgroundImage:'url("https://wallpaperaccess.com/full/2905605.jpg")',
  
         backgroundRepeat: "repeat",
         backgroundSize: 'cover',*/
        backgroundColor: `${theme.palette.background.default}`
    },
    text: {
        color: `${theme.palette.primary.contrastText}`,
    },
    conteinerFomart: {
        position: "relative",
        justifyContent: "center"
    },
    conteiner: {
        position: "static",
        padding: `${theme.spacing(2)}`,
        overflowY: "scroll",
        scrollbarHeight: "none",
        maxHeight: "65vh",
        maxWidth: "90%",
        border: "0px",
        // backgroundColor: 'red',
        "&::-webkit-scrollbar": {
            width: "0px",
            height: "10px",
            backgroundColor: `${theme.palette.background.paper}`,
            borderRadius: "6px"
        },
        "&::-webkit-scrollbar-track:": {
            borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 99%)`,
            borderRadius: "6px"
        },

        [theme.breakpoints.down('sm')]: {
            // backgroundColor: 'pink',
            maxHeight: "81vh",
            justifyContent: 'flex-end',
            maxWidth: "110vw",
            "&::-webkit-scrollbar": {
                width: "10px",
                height: "0px",
                backgroundColor: `${theme.palette.background.paper}`,
                borderRadius: "6px"
            },
        }

    },
}))
interface IPros {
    readonly texts: Text[]
    readonly text: Text
    readonly open: boolean

    loadTextRequest(userId: string): void
    handleDialog(dialog: any): void
    createTextRequest(text: Text): void
    updateTextRequest(text: any): void
    findTextRequest(textId: string): void
    removeTextRequest(textId: string): void
    resetCreate(): void
}

const Workspace = (props: IPros) => {
    const {
        text,
        texts,
        open,
        loadTextRequest,
        handleDialog,
        createTextRequest,
        findTextRequest,
        updateTextRequest,
        removeTextRequest,
        resetCreate
    } = props
    const classes = useStyles()
    const theme = useTheme()
    const auth = useContext(AuthContext)

    
    useEffect(() => {
        if (auth.user?.id) {
            loadTextRequest(auth.user.id)
        }
    }, [open, text,auth.user])

    const handleClickOpen = () => {
        handleDialog({ open: true })
    }

    const handleClose = () => {
        handleDialog({ open: false })
        resetCreate()
    }

    const matches = useMediaQuery('(min-width:400px)')
    return <div className={classes.backgound}>
        <MenuAppBar />
        <Box sx={{ display: 'flex', height: '85vh', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container className={classes.conteinerFomart}>
                <Grid container className={classes.conteiner} direction={matches ? 'column' : 'row'} spacing={2}>
                    {texts.map((item, index: number) =>
                        <Grid key={index} item xs={12} sm={4} md={2}  >
                            <TextCard
                                text={item}
                                handleClickOpen={handleClickOpen}
                                findTextRequest={findTextRequest}
                                removeTextRequest={removeTextRequest}
                            />
                        </Grid>
                    )}
                </Grid>

            </Grid>
        </Box>
        <FormDialog
            text={text}
            open={open}
            user={auth.user}
            handleClose={handleClose}
            handleDialog={handleDialog}
            createTextRequest={createTextRequest}
            updateTextRequest={updateTextRequest}
            resetCreate={resetCreate}
        />
        <ButtonSpeedDial handleDialog={handleDialog} open={open} />
    </div >
}
const mapStateToProps = (state: IApplicationState) => ({
    texts: state.text.list.texts,
    open: state.text.dialog.open,

    text: state.text.create.text
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...TextActions,

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)