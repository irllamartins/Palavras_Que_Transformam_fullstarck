import * as React from 'react';
import { Theme, styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }: { theme: Theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main,

  },
}));

interface Props {
  value: number
}


export default function ProgressBar({ value }:Props) {
  return <Box sx={{ width: '100%' }}>
  <LinearProgress variant="determinate" value={value } />
</Box>

}
