import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"

interface User {
    name: string
    points: number
}
const useStyles = makeStyles((theme: Theme) => ({

    text: {
        color: `${theme.palette.primary.contrastText}`,
    },
    table: {
        "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: `${theme.palette.background.paper}`,
            borderRadius: "6px"
        },
      "&::-webkit-scrollbar-track:": {
            borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 99%)`,
            borderRadius: "6px"
        }
    }
}))

const Rank = (props: any) => {
    const classes = useStyles()
    const { users } = props
    return <TableContainer sx={{ maxHeight: 220 }} className={classes.table} >
        <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.text}><Typography className={classes.text}>Posição</Typography></TableCell>
                    <TableCell className={classes.text}><Typography className={classes.text}>Nome</Typography></TableCell>
                    <TableCell className={classes.text}><Typography className={classes.text}>Pontos</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user: User, index: number) => (
                    <TableRow
                        key={index} >
                        <TableCell className={classes.text}><Typography className={classes.text}>{index + 1}</Typography></TableCell>
                        <TableCell className={classes.text}><Typography className={classes.text}>{user.name}</Typography></TableCell>
                        <TableCell className={classes.text}><Typography className={classes.text}>{user.points}</Typography></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}
export default Rank