import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Achievements } from '../../store/application/model/achievements';
import { IconButton, Tooltip } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { ItemAchievement } from './achievement.item';


interface StepProps {
    title: string
    achievements?: Achievements[]
}
const Achievement = (props: StepProps) => {
    const { achievements, title } = props

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = achievements?.length || 0;
    const colorFont = theme.palette.getContrastText(theme.palette.background.paper)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box 
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        >
            <Box>
                <Typography
                    sx={{ color: colorFont }}
                    variant="h6"
                    align="center"
                >
                    {title}
                </Typography>
            </Box>
            <Box sx={{}}>
                {achievements?.map((item: Achievements) => <ItemAchievement item={item}/>)}
            </Box>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                sx={{ color: colorFont }}
                position="static"
                activeStep={activeStep}
                nextButton={
                    maxSteps > 0 && <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{ color: colorFont }}
                    >
                        Proximo
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button 
                    size="small"
                     onClick={handleBack} 
                     disabled={activeStep === 0}
                     sx={{ color: colorFont }}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Anterior
                    </Button>
                }
            />
        </Box>
    );
}

export default Achievement
