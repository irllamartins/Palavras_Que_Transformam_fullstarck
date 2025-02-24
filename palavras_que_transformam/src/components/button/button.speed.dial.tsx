import * as React from 'react'
import { Box, SpeedDial } from '@mui/material'
import {
    SpeedDialIcon,
    SpeedDialAction,
    Theme
} from '@mui/material'
import {
    NoteAddOutlined,
    LightbulbOutlined
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { TextType } from '../../store/application/model/text'

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        color: `${theme.palette.primary.contrastText}`,
        backgroundColor: `${theme.palette.secondary.main}`
    },
    text: {
        color: `${theme.palette.primary.contrastText}`,
    }
}))

const actions = [
    { icon: <NoteAddOutlined style={{ color: "white" }} />, name: 'Novo texto', cor: "#772EB0", type: TextType.COMMON },
    { icon: < LightbulbOutlined />, name: 'Desafio diario', cor: "#F1CE15", type: TextType.CHALLENGE },
];
interface IProps {
    readonly open: boolean
   
    handleDialog(type:string): void
}
export default function ButtonSpeedDial(props: IProps) {
    const { open, handleDialog } = props
    const classes = useStyles()

    const [height, setHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])


    return (
        <Box sx={{ height: `${0}vh`, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={()=>handleDialog(action.type)}
                        FabProps={{ style: { backgroundColor: action.cor } }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
