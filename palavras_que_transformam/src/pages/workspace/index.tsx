import {
    Box,
    Grid2 as Grid,
    Theme,
    useMediaQuery
} from "@mui/material"
import { useEffect, useContext } from 'react'
import MenuAppBar from "../../components/menu/menu.app.bar"
import TextCard from "../../components/card/card"
import ButtonSpeedDial from "../../components/button/button.speed.dial"
import { makeStyles, useTheme } from '@mui/styles'
import { AppDispatch, RootState } from "../../store/duck"

import {
    createTextRequest,
    findTextRequest,
    handleDialog,
    loadTextRequest,
    removeTextRequest,
    resetCreate,
    updateTextRequest
} from '../../store/duck/texts'
import { useDispatch, useSelector } from "react-redux"
import FormDialog from "./form.dialog"
import { AuthContext } from "../../components/auth/AuthContext"
import TextSchema from "../../store/application/schema/text"
import TextEditor from "../../components/editor"


const useStyles = makeStyles((theme: Theme) => ({
    /*   backgound: {
       // backgroundImage:'url("https://img.freepik.com/fotos-gratis/texturas-de-madeira-velha_74190-5512.jpg?size=626&ext=jpg")',
         // backgroundImage:'url("https://totalhardwareja.com/cdn/shop/products/Prisma-Blue-HD-52110-ok-FACE-1_666x387.jpg?v=1652823897")',
         //backgroundImage:'url("https://images.hdqwalls.com/download/minimalist-landscape-to-2932x2932.jpg")',
         //backgroundImage:'url("https://i.pinimg.com/236x/33/0c/6d/330c6d5c2b49ce231d44e0cf691be571.jpg?nii=t")',
         //backgroundImage:'url("https://wallup.net/wp-content/uploads/2016/03/12/161242-simple_background-minimalism-cat-drawing-animals-sitting-blue_background.jpg")',
          backgroundImage:'url("https://wallpaperaccess.com/full/2905605.jpg")',
   
          backgroundRepeat: "repeat",
          backgroundSize: 'cover',
         backgroundColor: `${theme.palette.background.default}`
     },*/
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
        maxWidth: "90vw",
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
        [theme.breakpoints.down('md')]: {
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


const Workspace = () => {

    const classes = useStyles()
    const theme = useTheme()
    const auth = useContext(AuthContext)

    const text = useSelector((state: RootState) => state.texts.create.text)
    const texts = useSelector((state: RootState) => state.texts.list.texts)
    const open = useSelector((state: RootState) => state.texts.dialog.open)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (auth.user?.id) {
            dispatch(loadTextRequest({ userId: auth.user.id }))
        }
    }, [auth.user])

    const handleClickOpen = (textId: string) => {
        dispatch(findTextRequest({ textId: textId }))
        dispatch(handleDialog({ open: true }))
    }

    const handleClose = () => {
        dispatch(handleDialog({ open: false }))
        dispatch(resetCreate())
    }

    const handleFormSubmit = (text: TextSchema) => {
        console.log(text)
        if (text.id) {
            dispatch(updateTextRequest({ text }));
        } else {
            dispatch(createTextRequest({ text }));
        }
        handleClose();
    };

    const handleDialogOpen = (type: string) => {
        dispatch(handleDialog({ open: true, type: type }))
    }

    const removeText = (textId: string) => {
        if (textId && auth.user?.id) {
            dispatch(removeTextRequest({ textId }))
            dispatch(loadTextRequest({ userId: auth.user.id }))
        }
    }
    const matches = useMediaQuery('(min-width:400px)')
    return <div >
        <Box sx={{ display: 'flex', height: '85vh', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container sx={{ position: "relative", justifyContent: "center" }}>
                <Grid container className={classes.conteiner} direction={matches ? 'column' : 'row'} spacing={2}>
                    {texts.map((item: any, index: number) => {
                        return <Grid key={index} size={{ xs: 12, sm: 6, md: 2 }}  >
                            <TextCard
                                text={item}
                                handleClickOpen={() => handleClickOpen(item.id)}
                                findTextRequest={findTextRequest}
                                removeTextRequest={removeTextRequest}
                            />
                        </Grid>
                    })}
                </Grid>

            </Grid>
        </Box>
        <FormDialog
            text={text}
            open={open}
            user={auth.user}
            handleClose={handleClose}
            handleDialog={handleDialog}
            handleFormSubmit={handleFormSubmit}
            resetCreate={resetCreate}
            removeText={removeText}
        />
        <ButtonSpeedDial handleDialog={handleDialogOpen} open={open} />
    </div >
}

export default Workspace