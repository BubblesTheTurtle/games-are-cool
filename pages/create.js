import { Paper, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({ root: { '& > *': { margin: theme.spacing(3), padding: theme.spacing(2), width: "30vw", display: "block", marginLeft: "auto", marginRight: "auto"},},}));
export default function Create() {
    const classes = useStyles();
    return(

        <div className={classes.root}><Paper><Grid container spacing={2}>
            <Grid item><Card><CardActionArea>
                <CardMedia image="public/assets/images/tic-tac-toe-icon.png" title="tic tac toe icon" className={classes.media}/>
                <CardContent><Typography gutterBottom variant="h5" component="h2">Tic Tac Toe</Typography></CardContent>
            </CardActionArea></Card></Grid>
        </Grid></Paper></div>
    )
}