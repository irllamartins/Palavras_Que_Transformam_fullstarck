import { alpha, createTheme, getContrastRatio } from '@mui/material';
import { blue, cyan, yellow } from '@mui/material/colors';

const colorBasePrimaryDark = '#7F00FF'
const colorMainPrimaryDark = alpha(colorBasePrimaryDark, 0.7)

const colorBaseSecondaryDark = '#e553ce'
const colorMainSecondaryDark = alpha(colorBaseSecondaryDark, 0.7)

/*declare module '@mui/material/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}*/

export const DarkTheme = {
  palette: {
    primary: {
      main: colorMainPrimaryDark,
      dark: alpha(colorBasePrimaryDark, 0.9),
      light: alpha(colorBasePrimaryDark, 0.5),
      contrastText: getContrastRatio(colorMainPrimaryDark, '#202124') < 4.5 ? '#fff' : '#111',
    },
    secondary: {
      main: colorMainSecondaryDark,
      dark: alpha(colorBaseSecondaryDark, 0.9),
      light: alpha(colorBaseSecondaryDark, 0.5),
      contrastText: getContrastRatio(colorMainSecondaryDark, '#202124') < 4.5 ? '#fff' : '#111',
    },

    background: {
      paper: '#303134',
      default: '#202124',
    },
    
  },
  components: {
   /* MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <h1> by default
          poster: 'h1',
        },
      },
    },*/
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-placeholderColor': '#ff87b6',
          '--TextField-brandBorderColor': '#ff87b6',
        },
        
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            color: '--TextField-placeholderColor',
            borderBottom: '2px solid var(--TextField-brandBorderColor)',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  },
 /* typography: {
    fontFamily: [
      'Satisfy',
    ].join(','),
  },
  poster: {
    fontSize: '4rem',
    color: 'red',

  }*/
}

const colorBasePrimaryLight = '#7F00FF'
const colorMainPrimaryLight = alpha(colorBasePrimaryLight, 0.7)

// const colorBaseSecondaryLight = '#ff0080'
const colorBaseSecondaryLight = "#ff8000"
const colorMainSecondaryLight = alpha(colorBaseSecondaryLight, 0.7)

export const LightTheme = {

  palette: {
    primary: {   
      main: colorMainPrimaryLight,
      dark: alpha(colorBasePrimaryLight, 0.9),    
      light: alpha(colorBasePrimaryLight, 0.5),
      contrastText: getContrastRatio(colorMainPrimaryLight, '#f7f6f3') < 4.5? '#fff' : '#111',
    },
    secondary: {
      main: colorMainSecondaryLight,
      dark: alpha(colorBaseSecondaryLight, 0.9),
      light: alpha(colorBaseSecondaryLight, 0.5),
      contrastText: getContrastRatio(colorMainSecondaryLight, '#f7f6f3') < 4.5 ? '#fff' : '#111',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    },
    accent:{
      notComplete:"DarkGray"
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  }
}