import { Box, Grid2 as Grid } from "@mui/material"
import AchievementTable from "./tableText2"
import SortableTable from "./tableText2"

interface AchievementProps{

}

const Achievement = () => {
    return (<Box sx={{ display: 'flex', height: '85vh',justifyContent: 'center'}} >
        <Grid container>
            <Grid>
                <SortableTable/>
            </Grid>
        </Grid>
        </Box>
    )
}
export default Achievement