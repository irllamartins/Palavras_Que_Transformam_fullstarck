import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material';
import { Button, Theme } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles'

const styles = makeStyles((theme: Theme) => ({
  activeButton: {
    backgroundColor: theme.palette.text.primary
  }
}))

export const configToolbar= () => {
  const classes = styles()

  return {
    options: ['inline', 'blockType', 'history'],
  }
}