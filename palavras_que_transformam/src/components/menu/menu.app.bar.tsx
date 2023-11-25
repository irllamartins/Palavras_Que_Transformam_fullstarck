import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {
  Avatar,
  CircularProgress,
  Grid,
  Box,
  Fab,
  Stack,
  Badge,
  Theme
} from '@mui/material';
import gato from "../../assert/gato-sem-fundo.png"
import { LightMode, LightModeOutlined, Nightlight, NightlightOutlined, Save } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppThemeContext } from '../theme/context'
import { makeStyles } from '@mui/styles'
import { green } from '@mui/material/colors';
import clsx from 'clsx';
import { AuthContext } from '../auth/AuthContext';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    color: `${theme.palette.secondary.main}`
  },
  constrast: {
    color: `${theme.palette.background.default}`
  },
  text: {
    color: `${theme.palette.primary.contrastText}`,
  },
  points: {
    color: `${theme.palette.success.main}`,
  }
}))

const MenuAppBar = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const { themeName, toggleTheme } = useAppThemeContext()
  const auth = React.useContext(AuthContext)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [level, setLevel] = React.useState<number>(10);
  const [name, setName] = React.useState<string>("");
  const [progress, setProgress] = React.useState<number>(0)
  const [derisablePoints, setDerisablePoints] = React.useState<number>(1000)

  const calcule = (value:number) => (((value/derisablePoints))*100)
  React.useEffect(() => {
    if(auth.user){
      const value = auth.user?.point || 0
      setName(auth.user.name || "")
      setLevel(Math.floor(value/100))
      setProgress(calcule(value))
    }
    
  }, [])

  const nameFormat = (value: string) => {
    const divide = value.split(' ')
    return `${divide[0][0]} ${divide[1] ? divide[1][0] : ""}`
}

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item><img src={gato} height={50} width={50} /></Grid>
            <Grid item>
              <Typography sx={{ flexGrow: 1, color: "white" }}>
                Palavras Que
              </Typography>
              <Typography sx={{ flexGrow: 1, color: "white" }}>
                Transformam
              </Typography>
            </Grid>
          </Grid>
          <div>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleTheme} >
                {themeName === "light" ? <LightModeOutlined className={classes.constrast} /> : <NightlightOutlined className={classes.constrast} />}
              </IconButton>
              <Box sx={{ m: 1, position: 'relative' }}>
                <CircularProgress
                  size={50}
                  variant="determinate"
                  value={progress}
                  sx={{
                    color: "#23dd7a",
                    position: 'absolute',
                    top: 7,
                    left: 7,
                    zIndex: 0,
                  }}
                />
                <Badge
                  overlap="circular"
                  style={{ zIndex: 1 }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={<>
                    <Typography style={{ fontSize: 10 }} sx={{ color: "white" }}>
                      <strong>LV.</strong>
                    </Typography>
                    <Typography variant='button' sx={{ color: "white" }}>
                      <strong>{level}</strong>
                    </Typography>
                  </>
                  }
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar alt="avatar" sx={{ bgcolor: "orange" }}> {name && nameFormat(name)}</Avatar>
                  </IconButton>
                </Badge>

              </Box>
            </Box>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>
                <Typography className={classes.text}>Meu perfil</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/workspace')}>
                <Typography className={classes.text}>Area de escrita</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate('/statistic')}>
                <Typography className={classes.text}>Estatistica</Typography>
              </MenuItem>
              <MenuItem onClick={async () => {
                await auth.signout()
                navigate("/")
              }} >
                <Typography style={{ color: "red" }} className={clsx(classes.text)}>Sair</Typography>
              </MenuItem>
            </Menu>

          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default MenuAppBar
