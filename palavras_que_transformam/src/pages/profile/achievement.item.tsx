import { EmojiEvents } from "@mui/icons-material"
import { IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { Achievements } from "../../store/application/model/achievements"

interface ItemProps{
   item: Achievements
}
 export const ItemAchievement = (props:ItemProps)=>{
    const{item}= props
     const theme = useTheme();
    const colorFont = theme.palette.getContrastText(theme.palette.background.paper)

    return <Tooltip title={
        <>
            <Typography variant='h6'  align='center'  sx={{ fontSize: 10 }} >{item.title}</Typography>
            <Typography variant='body1' align='justify'   sx={{ fontSize: 10 }}>{item.description}</Typography>
        </>
    } >
        <IconButton size="large" sx={{color:colorFont}}>
            <EmojiEvents />
        </IconButton>
    </Tooltip>
}