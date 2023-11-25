import * as React from 'react';
import {
    Box,
    CircularProgress, 
    CircularProgressProps,
    Theme,
    Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({

    text:{
        color: `${theme.palette.primary.contrastText}`,
    }
}))


const CircularProgressWithLabel = (props: CircularProgressProps & { value: number,size:number }) =>{
    const classes = useStyles()
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={100} size={props.size} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ fontSize: `${props.size / 4}px` }}
                    className={classes.text}
                >{`${Math.round(props.value)}`}</Typography>
            </Box>
        </Box>
    );
}
interface Props {
    progress: number
    size: number
  }
  
export default function CircularWithValueLabel({ progress, size }: Props) {
    return <CircularProgressWithLabel value={progress} size={size}/>;
}
